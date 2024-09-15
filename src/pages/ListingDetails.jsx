import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import ArrowLeft from "../../public/arrorLeft.svg?react";

import Loader from "../ui/Loader.jsx";
import PageNotFound from "./PageNotFound.jsx";
import RealEstateDetails from "../ui/RealEstateDetails.jsx";
import SliderListing from "../ui/SliderListing.jsx";
import { useRealEstateById } from "../hooks/useRealEstateById.js";

const ListingDetails = () => {
  const navigate = useNavigate();
  const { realEstateId } = useParams();
  const { realEstate, isLoading, error } = useRealEstateById(realEstateId);

  if (isLoading) return <Loader />;
  if (error) return <PageNotFound />;

  function handleNavigate() {
    navigate("/");
  }

  return (
    <StyledListingDetails>
      <div>
        <span onClick={handleNavigate}>
          <ArrowLeft />
        </span>
      </div>
      <RealEstateDetails realEstate={realEstate} realEstateId={realEstateId} />
      <h2>ბინები მსგავს ლოკაციაზე</h2>
      <SliderListing
        regionName={realEstate.city.region.name}
        realEstateId={realEstateId}
      />
    </StyledListingDetails>
  );
};
export default ListingDetails;

const StyledListingDetails = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 6.4rem;

  & > div {
    & > span {
      width: 3.2rem;
      height: 3.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      & > svg {
        fill: var(--color-text);
        width: 2.13rem;
        height: 2.13rem;
      }
    }
  }

  & > h2 {
    font-size: var(--font-size-extra-huge);
    font-weight: var(--font-weight-medium);
    margin: 5.3rem 0 5.2rem 0;
  }
`;
