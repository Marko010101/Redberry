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
    onSuccess: (data) => {
      queryClient.invalidateQueries("realEstate");
      console.log(data);
    },
  });

  return { createRealEstate, isLoading, error };
}
