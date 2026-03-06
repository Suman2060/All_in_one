import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { useAuthStore } = await import("@/store/authStore");
    const token = useAuthStore.getState().user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE interceptor — global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        import("@/store/authStore").then(({ useAuthStore }) => {
          useAuthStore.getState().logout();
          window.location.href = "/login";
        });
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("[API] Request timed out");
    } else {
      console.error("[API] Network error");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;