import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import X from "../assets/x.svg?react";
import RealEstateCard from "./ui/RealEstateCard.jsx";

const FilteredList = ({ list }) => {
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

  return (
    <>
      <StyledFilteredQueries>
        {selectedRegions?.map((region) => (
          <p key={region}>
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
            {minArea ? minArea : "0"}² - {maxArea ? maxArea : "∞"}მ²
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
      </StyledFilteredQueries>
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

export default FilteredList;

const StyledFilteredQueries = styled.div`
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

      &:hover svg {
        stroke: var(--color-text);
      }
    }

    & > span svg {
      width: 1.4rem;
      height: 1.4rem;
      stroke: var(--color-charcoal-navy);
    }
  }

  & > span {
    font-weight: var(--font-weight-medium);
    margin-left: 0.8rem;
    cursor: pointer;
  }
`;

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 3.2rem 0rem 15rem 0rem;

  & > h3 {
    width: max-content;
    font-size: var(--font-size-big);
    font-weight: var(--font-weight-regular);
    margin-top: 3.3rem;
    text-align: center;
  }
`;
