import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message ?? error.message;

      switch (status) {
        case 400:
          console.error("[API] Bad Request:", message);
          break;
        case 401:
          console.error("[API] Unauthorized — redirecting to login");
          break;
        case 403:
          console.error("[API] Forbidden — you don't have permission");
          break;
        case 404:
          console.error("[API] Not Found:", error.config.url);
          break;
        case 500:
          console.error("[API] Server Error — try again later");
          break;
        default:
          console.error(`[API] Error ${status}:`, message);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("[API] Request timed out");
    } else {
      console.error("[API] Network Error — check your connection");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;