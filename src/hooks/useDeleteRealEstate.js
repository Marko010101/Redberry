import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRealEstateById } from "../service/apiRealEstate.js";

export function useDeleteRealEstate() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteRealEstate,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deleteRealEstateById,
    onSuccess: () => {
      queryClient.invalidateQueries(["realEstate"]);
    },
  });

  return { deleteRealEstate, isLoading, error };
}
