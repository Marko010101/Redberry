import { useQuery } from "@tanstack/react-query";
import { useRealEstateById } from "../service/apiRealEstate.js";

export const useRealEstateById = (id) => {
  const {
    data: realEstate,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["realEstate", id],
    queryFn: () => getRealEstateById(id),
    enabled: Boolean(id),
  });

  return { realEstate, isLoading, error };
};
