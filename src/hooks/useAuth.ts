import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import type { LoginFormData } from "@/schema/auth.schema";

const useAuth = () => {
  const navigate = useNavigate();
  const store = useAuthStore();

  const isLoggedIn = store.user !== null;
  const username = store.user?.username ?? "";
  const userId = store.user?.id ?? null;

  const handleLogin = async (
    data: LoginFormData,
    redirectTo = "/"
  ): Promise<void> => {
    const success = await store.login(data);
    if (success) navigate(redirectTo);
  };

  const handleLogout = () => {
    store.logout();
    navigate("/login");
  };

  return {
    user: store.user,
    isLoggedIn,
    username,
    userId,
    isLoading: store.isLoading,
    error: store.error,

    handleLogin,
    handleLogout,
    clearError: store.clearError,
  };
};

export default useAuth;