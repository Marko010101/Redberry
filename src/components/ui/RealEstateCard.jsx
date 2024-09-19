import styled from "styled-components";
import { Link } from "react-router-dom";

import Location from "../../assets/location.svg?react";

import BedIcon from "../../assets/bed.svg?react";
import PostCodeIcon from "../../assets/postCode.svg?react";
import Square from "../../assets/square.svg?react";
import { formatPrice } from "../../utils/formatPrice.js";

const RealEstateCard = ({ realEstate }) => {
  const {
    address,
    area,
    bedrooms,
    city,
    id,
    image,
    is_rental,
    price,
    zip_code,
  } = realEstate;

  const { name } = city;

  const rental = is_rental ? "ქირავდება" : "იყიდება";

  return (
    <StyledCard to={`/real-estates/${id}`}>
      <img src={`${image}`} alt="" />
      <span className="isRental">{rental}</span>

      <div>
        <h2>{formatPrice(price, false)} ₾</h2>
        <p>
          <span>
            <Location />
          </span>
          {name}, {address}
        </p>
        <p className="info-gap">
          <span>
            <BedIcon />
            {bedrooms}
          </span>
          <span>
            <Square />
            {area}
          </span>
          <span>
            <PostCodeIcon />
            {zip_code}
          </span>
        </p>
      </div>
    </StyledCard>
  );
};

export default RealEstateCard;

const StyledCard = styled(Link)`
  width: 38.4rem;
  max-width: 38.4rem;
  height: 45.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 1.4rem;
  position: relative;
  cursor: pointer;

  &:hover {
    box-shadow: 0.5rem 0.5rem 1.2rem rgba(2, 21, 38, 0.08);
  }

  & img {
    height: 30.7rem;
    width: 100%;
    object-fit: cover;
    border-radius: 1.4rem 1.4rem 0 0;
  }

  & > span {
    border-radius: 1.5rem;
    width: 9rem;
    text-align: center;
    font-size: var(--font-size-tiny);
    top: 2.3rem;
    left: 2.3rem;
  }

  & h2 {
    font-size: var(--font-size-huge);
    font-weight: var(--font-weight-bold);
  }

  & > div {
    border: 0.1rem solid var(--color-light-gray);
    border-top: 0;
    flex-grow: 1;
    padding: 2.2rem 2.5rem;
    gap: 2rem;
    border-radius: 0 0 1.4rem 1.4rem;

    & > p {
      display: flex;
      align-items: center;
      margin-top: 0.6rem;
      gap: 0.4rem;
      color: var(--color-text-dark);
      line-height: 1.92rem;

      & > span {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        & > svg {
          fill: var(--color-text-secondary);
        }
      }
    }

    & > .info-gap {
      gap: 3.2rem;
      margin-top: 2rem;
    }
  }
`;
