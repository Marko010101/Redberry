import { useMutation } from "@tanstack/react-query";
import { createAgentApi } from "../service/apiAgents.js";

export function useCreateAgent() {
  const {
    mutate: createAgent,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createAgentApi,
    onSuccess: (data) => {
      console.log("Agent created successfully", data);
    },
    onError: (error) => {
      console.error("Error creating agent", error);
    },
  });

  return { createAgent, isLoading, error };
}
