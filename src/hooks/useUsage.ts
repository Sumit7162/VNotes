import { useQuery } from "@tanstack/react-query";
import { usageApi } from "../services/usage";
import type { UsageSummary } from "../types";

export function useUsage(refetchInterval: number | false = false) {
  return useQuery<UsageSummary>({
    queryKey: ["usage"],
    queryFn: usageApi.getSummary,
    refetchInterval,
  });
}
