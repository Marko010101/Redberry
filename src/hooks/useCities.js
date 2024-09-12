import { useQuery } from "@tanstack/react-query";
import { getCities } from "../service/apiCities.js";

export function useCities() {
  const {
    data: cities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  return { cities, isLoading, error };
}
