import api from "./api";
import type { UsageSummary } from "../types";

export const usageApi = {
  getSummary: async (): Promise<UsageSummary> => {
    const response = await api.get("/api/usage");
    const data = response.data;
    return {
      total_videos: data.total_videos ?? 0,
      today: {
        date: data.date,
        videos_processed: data.videos_processed,
        short_videos_processed: data.short_videos_processed ?? 0,
        minutes_processed: data.minutes_processed,
        daily_limit: data.daily_limit,
        daily_short_limit: data.daily_short_limit ?? 10,
        remaining_videos: data.remaining_videos,
        remaining_short_videos: data.remaining_short_videos ?? 10,
        max_duration_minutes: data.max_duration_minutes,
        remaining_minutes: data.remaining_minutes,
      },
    };
  },
};
