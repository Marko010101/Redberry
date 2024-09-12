import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    regions: [],
    price: { min: null, max: null },
    area: { min: null, max: null },
    bedrooms: null,
  });

  const handleFiltersChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <FilterContext.Provider value={{ filters, handleFiltersChange }}>
      {children}
    </FilterContext.Provider>
  );
};
