import { useQuery } from "@tanstack/react-query";
import { getRealEstateList } from "../service/apiRealEstate.js";

export function useRealEstate() {
  const {
    data: list,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["realEstate"],
    queryFn: getRealEstateList,
  });

  return { list, isLoading, error };
}
