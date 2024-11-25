import { useState } from "react";

import FilterListItem from "./FilterListItem.jsx";
import { useRegions } from "../hooks/useRegions.js";
import Loader from "./ui/Loader.jsx";
import { useEffect } from "react";

const FilterList = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth <= 768);
  const { regions, isLoading, error } = useRegions();

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleClose = () => {
    setOpenIndex(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <p>{error.message || error}</p>;

  return (
    <ul>
      <FilterListItem
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
        isOpen={openIndex === 1}
        onToggle={() => handleToggle(1)}
        onClose={handleClose}
        title="ფასის მიხედვით"
        dropdownType="input"
      >
        {isSmallDevice ? "ფასი" : "საფასო კატეგორია"}
      </FilterListItem>
      <FilterListItem
        isOpen={openIndex === 2}
        onToggle={() => handleToggle(2)}
        onClose={handleClose}
        title="ფართობის მიხედვით"
        dropdownType="input"
      >
        ფართობი
      </FilterListItem>
      <FilterListItem
        isOpen={openIndex === 3}
        onToggle={() => handleToggle(3)}
        onClose={handleClose}
        title="საძინებლების რაოდენობა"
        dropdownType="bedroom"
      >
        {isSmallDevice ? "საძინებლები" : "საძინებების რაოდენობა"}
      </FilterListItem>
    </ul>
  );
};

export default FilterList;
