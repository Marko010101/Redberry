import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled, { css } from "styled-components";

import ArrowLeft from "../assets/arrowLeft.svg?react";
import ArrowRight from "../assets/arrowRight.svg?react";

import RealEstateCard from "./ui/RealEstateCard.jsx";
import Loader from "./ui/Loader.jsx";
import { useRealEstate } from "../hooks/useRealEstate.js";

const SliderListing = ({ regionName, realEstateId }) => {
  const { list, isLoading, error } = useRealEstate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  if (isLoading) return <Loader />;

  const filteredList = list?.filter((realEstate) => {
    return (
      realEstate.id !== Number(realEstateId) &&
      realEstate.city.region.name === regionName
    );
  });
  const isListSlider = filteredList.length <= 4;

  return (
    <StyledSlider isListSlider={isListSlider} className="slider-container">
      {isListSlider ? (
        <div>
          {filteredList?.map((realEstate) => (
            <RealEstateCard realEstate={realEstate} key={realEstate?.id} />
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {filteredList?.map((realEstate) => (
            <RealEstateCard realEstate={realEstate} key={realEstate?.id} />
          ))}
        </Slider>
      )}
    </StyledSlider>
  );
};

export default SliderListing;

const StyledSlider = styled.div`
  position: relative;
  width: 161.5rem;
  height: 45.5rem;
  margin-bottom: 10rem;

  ${(props) =>
    props.isListSlider &&
    css`
      & > div {
        display: flex;
        align-items: center;
        gap: 2rem;
      }
    `}

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-track {
    margin-left: -1rem;
  }

  .custom-arrow {
    position: absolute;
    top: 50%;
    z-index: 100;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
      fill: var(--color-text);
      width: 2rem;
      height: 2rem;
    }

    &:hover {
      opacity: 0.8;
    }
  }

  .prev-arrow {
    left: -6.5rem;
    transform: translateY(-50%);
  }

  .next-arrow {
    right: -4.5rem;
    transform: translateY(-50%);
  }
`;

const CustomPrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev-arrow" onClick={onClick}>
    <ArrowLeft />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div className="custom-arrow next-arrow" onClick={onClick}>
    <ArrowRight />
  </div>
);
