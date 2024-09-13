import { useState } from "react";

import FilterListItem from "./FilterListItem.jsx";
import { useRegions } from "../hooks/useRegions.js";
import Loader from "./Loader.jsx";

const FilterList = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { regions, isLoading, error } = useRegions();

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleClose = () => {
    setOpenIndex(null);
  };

  if (isLoading) return <Loader />;

  return (
    <ul>
      <FilterListItem
        index={0}
        isOpen={openIndex === 0}
        onToggle={() => handleToggle(0)}
        onClose={handleClose}
        data={regions}
        title="რეგიონების მიხედვით"
        dropdownType="checkbox"
      >
        რეგიონი
      </FilterListItem>
      <FilterListItem
        index={1}
        isOpen={openIndex === 1}
        onToggle={() => handleToggle(1)}
        onClose={handleClose}
        title="ფასის მიხედვით"
        dropdownType="input"
      >
        საფასო კატეგორია
      </FilterListItem>
      <FilterListItem
        index={2}
        isOpen={openIndex === 2}
        onToggle={() => handleToggle(2)}
        onClose={handleClose}
        title="ფართობის მიხედვით"
        dropdownType="input"
      >
        ფართობი
      </FilterListItem>
      <FilterListItem
        index={3}
        isOpen={openIndex === 3}
        onToggle={() => handleToggle(3)}
        onClose={handleClose}
        title="საძინებლების რაოდენობა"
        dropdownType="bedroom"
      >
        საძინებების რაოდენობა
      </FilterListItem>
    </ul>
  );
};

export default FilterList;
