import api from "./api";
import type { User } from "../types";

export const authApi = {
  getMe: async (): Promise<User> => {
    const response = await api.get("/api/auth/me");
    return response.data;
  },
};
