import { useQuery } from "@tanstack/react-query";
import { notesApi } from "../services/notes";
import type { Note } from "../types";

export function useNotes() {
  return useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: notesApi.list,
  });
}

export function useNotesForVideo(videoId: string | null, enabled = true) {
  return useQuery<Note>({
    queryKey: ["notes", videoId],
    queryFn: () => notesApi.getForVideo(videoId!),
    enabled: !!videoId && enabled,
    retry: 2,
  });
}
