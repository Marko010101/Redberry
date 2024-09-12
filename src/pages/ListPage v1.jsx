import styled from "styled-components";
import Button from "../ui/Button.jsx";
import FilterList from "../ui/FilterList.jsx";
import PlusVector from "../../public/plusVector.svg?react";
import Loader from "../ui/Loader.jsx";
import RealEstateCard from "../ui/RealEstateCard.jsx";
import { useRealEstate } from "../hooks/useRealEstate.js";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const StyledFilter = styled.section`
  margin-top: 7.7rem;
  display: flex;
  justify-content: space-between;

  & ul {
    display: flex;
    gap: 2.4rem;
    padding: 0.6rem;
    border: 1px solid var(--color-light-gray);
    border-radius: 1rem;
  }

  & > div {
    display: flex;
    gap: 1.6rem;

    & button {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
  }
`;

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 13rem;
`;

const ListPage = () => {
  const { list, isLoading } = useRealEstate();

  const [selectedRegions, setSelectedRegions] = useState(
    JSON.parse(localStorage.getItem("selectedRegions")) || []
  );

  useEffect(() => {
    localStorage.setItem("selectedRegions", JSON.stringify(selectedRegions));
  }, [selectedRegions]);

  const handleFilterChange = (regions) => {
    setSelectedRegions(regions);
  };

  // Filter real estate based on selected regions
  const filteredList = list?.filter((item) =>
    selectedRegions.length
      ? selectedRegions.includes(item.city.region.name)
      : true
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <StyledFilter>
        <FilterList onFilterChange={handleFilterChange} />
        <div>
          <Button type="primary">
            <PlusVector />
            ლისტინგის დამატება
          </Button>
          <Button type="secondary">
            <PlusVector />
            აგენტის დამატება
          </Button>
        </div>
      </StyledFilter>
      <StyledList>
        {filteredList?.map((realEstate) => (
          <RealEstateCard realEstate={realEstate} key={realEstate?.id} />
        ))}
      </StyledList>
    </>
  );
};

export default ListPage;
