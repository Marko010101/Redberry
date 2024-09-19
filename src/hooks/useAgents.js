import { useQuery } from "@tanstack/react-query";
import { getAgents } from "../service/apiAgents.js";

export function useAgents() {
  const {
    data: agents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  return { agents, isLoading, error };
}
