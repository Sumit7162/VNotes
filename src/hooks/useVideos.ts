import { useQuery } from "@tanstack/react-query";
import { videosApi } from "../services/videos";
import type { VideoListResponse } from "../types";

export function useVideos(limit = 50, offset = 0) {
  return useQuery<VideoListResponse>({
    queryKey: ["videos", limit, offset],
    queryFn: () => videosApi.list(limit, offset),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return false;
      const isProcessing = data.videos.some(
        (v) => v.status !== "completed" && v.status !== "failed"
      );
      return isProcessing ? 3000 : false;
    },
  });
}

export function useVideo(videoId: string | null) {
  return useQuery({
    queryKey: ["videos", videoId],
    queryFn: () => videosApi.get(videoId!),
    enabled: !!videoId,
    refetchInterval: (query) => {
      const video = query.state.data;
      if (!video || video.status === "completed" || video.status === "failed") {
        return false;
      }
      return 3000;
    },
  });
}
