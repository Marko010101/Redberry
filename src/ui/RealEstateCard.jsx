import styled from "styled-components";

import Location from "../../public/location.svg?react";

import BedIcon from "../../public/bed.svg?react";
import PostCodeIcon from "../../public/postCode.svg?react";
import Square from "../../public/square.svg?react";

const StyledCard = styled.div`
  height: 45.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 1.4rem;
  box-shadow: 0.5rem 0.5rem 1.2rem rgba(2, 21, 38, 0.08);
  position: relative;

  & img {
    height: 30.7rem;
    width: 100%;
    object-fit: cover;
    border-radius: 1.4rem 1.4rem 0 0;
  }

  & > span {
    position: absolute;
    top: 2.3rem;
    left: 2.3rem;
    padding: 0.6rem;
    border-radius: 1.5rem;
    width: 9rem;
    text-align: center;
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.05rem;
    font-size: var(--font-size-tiny);
    background-color: var(--color-text-secondary);
    color: var(--white);
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

const RealEstateCard = ({ realEstate }) => {
  const {
    address,
    area,
    bedrooms,
    city,
    city_id,
    id,
    image,
    is_rental,
    price,
    zip_code,
  } = realEstate;

  const { id: cityId, name, region, region_id } = city;

  const rental = is_rental ? "ქირავდება" : "იყიდება";

  return (
    <StyledCard>
      <img src={`${image}`} alt="" />
      <span>{rental}</span>

      <div>
        <h2>{price} ₾</h2>
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
