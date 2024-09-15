import { useQuery } from "@tanstack/react-query";
import { getRealEstateById } from "../service/apiRealEstate.js";

export const useRealestateById = (id) => {
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
