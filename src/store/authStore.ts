import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { LoginUser } from "@/services/Api"; // ✅ capital L to match the export in Api.ts
import type { AuthUser, LoginCredentials, JwtPayload } from "@/types/auth.types";

// This is the "shape" of our auth store (what data and functions it has)
interface AuthStore {
  user: AuthUser | null; // null means logged out
  isLoading: boolean;         // true while waiting for API response
  error: string | null;   // holds error message if login fails

  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  // persist = automatically saves the user to localStorage
  // So you stay logged in even if you refresh the page!
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      // LOGIN function
      login: async (credentials) => {
        set({ isLoading: true, error: null }); // show loading spinner

        try {
          // 1. Call the API with username + password
          const { token } = await LoginUser(credentials); // ✅ matches Cap L export

          // 2. Decode the JWT token to get the user's id and username
          //    A JWT token is like a sealed envelope from the server containing user info
          const decoded = jwtDecode<JwtPayload>(token);

          // 3. Save the user info in our store
          set({
            user: { id: decoded.sub, username: decoded.user, token },
            isLoading: false,
          });
          return true; // login succeeded!

        } catch {
          // If the API call failed (wrong password, server error, etc.)
          set({ error: "Invalid username or password", isLoading: false });
          return false; // login failed
        }
      },

      // LOGOUT function - just clear the user from store
      logout: () => set({ user: null, error: null }),

      // Clear the error message (e.g. when user starts typing again)
      clearError: () => set({ error: null }),
    }),
    { name: "auth-storage" } // this is the key used in localStorage
  )
);