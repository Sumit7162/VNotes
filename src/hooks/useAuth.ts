import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../services/auth";
import type { User } from "../types";

export function useAuth() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    
    // Check token on mount
    setToken(localStorage.getItem("token"));
    setIsLoaded(true);

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isSignedIn = !!token;

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery<User>({
    queryKey: ["user", token], // Re-fetch user if token changes
    queryFn: authApi.getMe,
    enabled: isSignedIn,
    retry: false,
  });

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  return {
    user,
    isSignedIn,
    isLoaded,
    isLoadingUser,
    userError,
    logout,
  };
}
