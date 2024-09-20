import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgentApi } from "../service/apiAgents.js";

export function useCreateAgent() {
  const queryClient = useQueryClient();

  const {
    mutate: createAgent,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createAgentApi,
    onSuccess: () => {
      queryClient.invalidateQueries("agents");
    },
  });

  return { createAgent, isLoading, error };
}
