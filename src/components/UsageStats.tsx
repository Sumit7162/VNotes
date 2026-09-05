import { BarChart3, Video, Clock, Zap, Timer } from "lucide-react";
import type { UsageData } from "../types";

interface UsageStatsProps {
  usage: UsageData | undefined;
  totalVideos: number;
}

export function UsageStats({ usage, totalVideos }: UsageStatsProps) {
  const remainingLong = usage?.remaining_videos ?? 2;
  const dailyLimitLong = usage?.daily_limit ?? 2;
  const processedLong = usage?.videos_processed ?? 0;

  const remainingShort = usage?.remaining_short_videos ?? 10;
  const dailyLimitShort = usage?.daily_short_limit ?? 10;
  const processedShort = usage?.short_videos_processed ?? 0;

  const longProgress = dailyLimitLong > 0 ? (processedLong / dailyLimitLong) * 100 : 0;
  const shortProgress = dailyLimitShort > 0 ? (processedShort / dailyLimitShort) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-paper-50 rounded-2xl border border-line p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-plum-100 text-plum-600">
              <Video className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink-900 tabular-nums">{totalVideos}</p>
              <p className="text-xs text-ink-500">Total Videos</p>
            </div>
          </div>
        </div>
        <div className="bg-paper-50 rounded-2xl border border-line p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent-100 text-accent-600">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink-900 tabular-nums">{processedShort + processedLong}</p>
              <p className="text-xs text-ink-500">Today's Videos</p>
            </div>
          </div>
        </div>
        <div className="bg-paper-50 rounded-2xl border border-line p-4 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-100 text-gold-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink-900 tabular-nums">{usage?.minutes_processed ?? 0}</p>
              <p className="text-xs text-ink-500">Minutes Used</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-paper-50 rounded-2xl border border-line p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-success-100 text-success-600">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-ink-800">Short Videos</span>
            </div>
            <span className="text-xs font-medium text-ink-500">&lt; 15 min</span>
          </div>
          <div className="flex items-end justify-between mb-2">
            <p className="text-2xl font-semibold text-ink-900 tabular-nums">
              {remainingShort} <span className="text-sm font-normal text-ink-400">/ {dailyLimitShort}</span>
            </p>
            <span className="text-xs text-ink-500">remaining today</span>
          </div>
          <div className="h-2 rounded-full bg-paper-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-success transition-all duration-500"
              style={{ width: `${Math.min(shortProgress, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-paper-50 rounded-2xl border border-line p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gold-100 text-gold-700">
                <Timer className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-ink-800">Long Videos</span>
            </div>
            <span className="text-xs font-medium text-ink-500">15–30 min</span>
          </div>
          <div className="flex items-end justify-between mb-2">
            <p className="text-2xl font-semibold text-ink-900 tabular-nums">
              {remainingLong} <span className="text-sm font-normal text-ink-400">/ {dailyLimitLong}</span>
            </p>
            <span className="text-xs text-ink-500">remaining today</span>
          </div>
          <div className="h-2 rounded-full bg-paper-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-accent-300 transition-all duration-500"
              style={{ width: `${Math.min(longProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
