import { useQuery } from "@tanstack/react-query";
import { getRegions } from "../service/apiRegions.js";

export function useRegions() {
  const {
    data: regions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

  return { regions, isLoading, error };
}
