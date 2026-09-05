import api from "./api";
import type { Note } from "../types";

export const notesApi = {
  getForVideo: async (videoId: string): Promise<Note> => {
    const response = await api.get(`/api/notes/${videoId}`);
    return response.data;
  },

  list: async (): Promise<Note[]> => {
    const response = await api.get("/api/notes");
    return response.data;
  },
};
