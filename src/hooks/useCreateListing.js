import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRealEstateAPi } from "../service/apiRealEstate.js";

export function useCreateListing() {
  const queryClient = useQueryClient();

  const {
    mutate: createRealEstate,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createRealEstateAPi,
    onSuccess: () => {
      queryClient.invalidateQueries("realEstate");
    },
  });

  return { createRealEstate, isLoading, error };
}
