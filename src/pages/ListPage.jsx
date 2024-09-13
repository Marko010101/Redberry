import { useRealEstate } from "../hooks/useRealEstate.js";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import PlusVector from "../../public/plusVector.svg?react";
import X from "../../public/x.svg?react";

import Button from "../ui/Button.jsx";
import FilterList from "../ui/FilterList.jsx";
import Loader from "../ui/Loader.jsx";
import RealEstateCard from "../ui/RealEstateCard.jsx";

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
  margin-top: 3.2rem;

  & > h3 {
    width: max-content;
    font-size: var(--font-size-big);
    font-weight: var(--font-weight-regular);
    margin-top: 3.3rem;
    text-align: center;
  }
`;

const ListPage = () => {
  const { list, isLoading, error } = useRealEstate();
  const [searchParams, setSearchParams] = useSearchParams();
  let filteredList;
  // Get query parameters
  const regionQuery = searchParams.get("region");
  const minPriceQuery = searchParams.get("minPrice");
  const maxPriceQuery = searchParams.get("maxPrice");
  const minAreaQuery = searchParams.get("minArea");
  const maxAreaQuery = searchParams.get("maxArea");
  const bedroomQuery = searchParams.get("bedroom");

  // Convert query parameters to their appropriate types
  const selectedRegions = regionQuery ? regionQuery.split(",") : [];
  const minPrice = minPriceQuery ? parseFloat(minPriceQuery) : null;
  const maxPrice = maxPriceQuery ? parseFloat(maxPriceQuery) : null;
  const minArea = minAreaQuery ? parseFloat(minAreaQuery) : null;
  const maxArea = maxAreaQuery ? parseFloat(maxAreaQuery) : null;
  const bedroom = bedroomQuery ? parseFloat(bedroomQuery) : null;

  filteredList = list?.filter((realEstate) => {
    const matchesRegion =
      selectedRegions.length &&
      selectedRegions.includes(realEstate.city.region.name);

    const matchesPrice =
      (minPrice !== null &&
        maxPrice === null &&
        realEstate.price >= minPrice) ||
      (minPrice === null &&
        maxPrice !== null &&
        realEstate.price <= maxPrice) ||
      (minPrice !== null &&
        maxPrice !== null &&
        realEstate.price >= minPrice &&
        realEstate.price <= maxPrice);

    const matchesArea =
      (minArea !== null && maxArea === null && realEstate.area >= minArea) ||
      (minArea === null && maxArea !== null && realEstate.area <= maxArea) ||
      (minArea !== null &&
        maxArea !== null &&
        realEstate.area >= minArea &&
        realEstate.area <= maxArea);

    const matchesBedroom = bedroom !== null && realEstate.bedrooms === bedroom;
    if (
      !regionQuery &&
      !minPriceQuery &&
      !maxPriceQuery &&
      !minAreaQuery &&
      !maxAreaQuery &&
      !bedroomQuery
    ) {
      return list;
    }

    if (matchesBedroom) return matchesBedroom;
    if (matchesArea) return matchesArea;
    if (matchesRegion) return matchesRegion;
    if (matchesPrice) return matchesPrice;
  });

  if (isLoading) return <Loader />;

  const isAnyFilter =
    Boolean(selectedRegions.length) ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    Boolean(minArea) ||
    Boolean(maxArea) ||
    Boolean(bedroom);

  const handleClearRegion = (region) => {
    const regions = searchParams.get("region")?.split(",") || [];
    const updatedRegions = regions.filter((r) => r !== region);
    if (updatedRegions.length) {
      searchParams.set("region", updatedRegions.join(","));
    } else {
      searchParams.delete("region");
    }
    setSearchParams(searchParams);
  };

  const handleClearPrice = () => {
    searchParams.delete("minPrice");
    searchParams.delete("maxPrice");
    setSearchParams(searchParams);
  };

  const handleClearArea = () => {
    searchParams.delete("minArea");
    searchParams.delete("maxArea");
    setSearchParams(searchParams);
  };

  const handleClearBedroom = () => {
    searchParams.delete("bedroom");
    setSearchParams(searchParams);
  };

  const handleClearFilter = () => {
    setSearchParams(new URLSearchParams());
  };

  console.log(isAnyFilter);
  return (
    <>
      <StyledFilter>
        <FilterList />

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

      <StyledFilteredList>
        {selectedRegions?.map((region, index) => (
          <p key={index}>
            {region}
            <span onClick={() => handleClearRegion(region)}>
              <X />
            </span>
          </p>
        ))}
        {(minPrice || maxPrice) && (
          <p>
            {minPrice ? minPrice : "0"}₾ - {maxPrice ? maxPrice : "∞"}₾
            <span onClick={handleClearPrice}>
              <X />
            </span>
          </p>
        )}
        {(minArea || maxArea) && (
          <p>
            {minArea ? minArea : "0"}მ² - {maxArea ? maxArea : "∞"}მ²
            <span onClick={handleClearArea}>
              <X />
            </span>
          </p>
        )}
        {bedroom && (
          <p>
            {bedroom}
            <span onClick={handleClearBedroom}>
              <X />
            </span>
          </p>
        )}
        {isAnyFilter && <span onClick={handleClearFilter}>გასუფთავება</span>}
      </StyledFilteredList>

      <StyledList>
        {filteredList.length ? (
          filteredList?.map((realEstate) => (
            <RealEstateCard realEstate={realEstate} key={realEstate?.id} />
          ))
        ) : (
          <h3>აღნიშნული მონაცემებით განცხადება არ იძებნება</h3>
        )}
      </StyledList>
    </>
  );
};
// მ²
export default ListPage;
const StyledFilteredList = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  max-width: 100%;
  flex-wrap: wrap;
  margin-top: 1.6rem;
  gap: 0.9rem;

  & p {
    display: flex;
    align-items: center;
    width: max-content;
    gap: 0.4rem;
    border: 0.1rem solid var(--color-light-gray);
    border-radius: 4.3rem;
    padding: 0.6rem 1rem;

    & > span {
      display: flex;
      cursor: pointer;
      width: max-content;
    }

    & > span > svg {
      width: 1.4rem;
      height: 1.4rem;
    }
  }

  & > span {
    font-weight: var(--font-weight-medium);
    margin-left: 0.8rem;
    cursor: pointer;
  }
`;
