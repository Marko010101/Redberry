import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Location from "../assets/location.svg?react";
import Bed from "../assets/bed.svg?react";
import Square from "../assets/square.svg?react";
import PostCode from "../assets/postCode.svg?react";
import Email from "../assets/email.svg?react";
import Phone from "../assets/phone.svg?react";

import Loader from "../components/ui/Loader.jsx";
import { formatDate } from "../utils/formatDate.js";
import { formatPrice } from "../utils/formatPrice.js";
import ModalDelete from "./ModalDelete.jsx";
import { useDeleteRealEstate } from "../hooks/useDeleteRealEstate.js";

const RealEstateDetails = ({ realEstate, realEstateId }) => {
  const navigate = useNavigate();
  const { deleteRealEstate, isLoading, error } = useDeleteRealEstate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  if (isLoading) return <Loader />;

  const handleDelete = () => {
    deleteRealEstate(realEstateId);
    toggleModal();
    navigate("/");
  };

  const {
    address,
    agent,
    area,
    bedrooms,
    city,
    created_at,
    description,
    image,
    is_rental,
    price,
    zip_code,
  } = realEstate;

  const { avatar, email, name, phone, surname } = agent;
  const { name: cityName } = city;

  const rental = is_rental ? "ქირავდება" : "იყიდება";

  return (
    <StyledDetails>
      <div>
        <img src={image} />
        <span className="isRental">{rental}</span>
        <p>გამოქვეყნების თარიღი {formatDate(created_at)}</p>
      </div>

      <div>
        <div className="info-realEstate">
          <h2>{formatPrice(price)} ₾</h2>
          <div>
            <p>
              <span>
                <Location className="location" />
              </span>
              {cityName}, {address}
            </p>
            <p>
              <span>
                <Square className="square" />
              </span>
              ფართი {area} მ²
            </p>
            <p>
              <span>
                <Bed />
              </span>
              საძინებელი {bedrooms}
            </p>
            <p>
              <span>
                <PostCode className="postCode" />
              </span>
              საფოსტო ინდექსი {zip_code}
            </p>
          </div>
        </div>

        <div className="info-agent">
          <p>{description}</p>
          <div>
            <div>
              <img src={avatar} />
              <div>
                <h4>
                  {name} {surname}
                </h4>
                <p>აგენტი</p>
              </div>
            </div>
            <p>
              <span>
                <Email />
              </span>
              {email}
            </p>
            <p>
              <span>
                <Phone />
              </span>
              {phone}
            </p>
          </div>
        </div>
        <button onClick={toggleModal}>ლისტინგის წაშლა</button>
        {isModalOpen && (
          <ModalDelete onClose={toggleModal} onApprove={handleDelete} />
        )}
      </div>
    </StyledDetails>
  );
};

export default RealEstateDetails;

const StyledDetails = styled.div`
  display: grid;
  grid-template-columns: max-content 50.3rem;

  column-gap: 6.8rem;
  margin-top: 2.9rem;

  & > div {
    position: relative;
    display: grid;
    height: max-content;
    color: var(--color-cloudy-gray);

    .info-realEstate {
      display: flex;
      flex-direction: column;
      margin: 3rem 0 4rem 0;

      & > h2 {
        font-size: var(--font-size-largest);
        color: var(--color-text);
      }

      & > div {
        margin-top: 2.4rem;
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
        font-size: var(--font-size-large);

        & > p {
          display: flex;
          align-items: center;
          gap: 0.4rem;

          & span {
            width: 2.2rem;
            height: 2.2rem;
            display: flex;
            align-items: center;
            justify-content: center;

            & svg {
              fill: var(--color-cloudy-gray);
            }
            .postCode {
              width: 1.8rem;
              height: 2.1rem;
            }
            .location {
              width: 1.54rem;
              height: 1.86rem;
            }
            .square {
              width: 1.7rem;
              height: 1.7rem;
            }
          }
        }
      }
    }
    .info-agent {
      & > p {
        line-height: 2.6rem;
      }

      & > div {
        margin-top: 5rem;
        padding: 2.4rem 0 2.4rem 2rem;
        border: 0.1rem solid var(--color-light-gray);
        border-radius: 0.8rem;

        & img {
          border-radius: 10rem;
          object-fit: cover;
          width: 7.2rem;
          height: 7.2rem;
        }

        & > div {
          display: flex;
          align-items: center;
          gap: 1.4rem;
          padding-bottom: 1.6rem;

          & h4 {
            font-weight: var(--font-weight-regular);
            color: var(--color-text);
            margin-bottom: 0.4rem;
          }

          & p {
            color: var(--color-storm-gray);
            font-size: var(--font-size-small);
          }
        }

        & > p:nth-of-type(2) {
          margin-top: 0.4rem;
        }
        & > p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: var(--font-size-small);

          & span {
            display: flex;
          }
        }
      }
    }

    & > img {
      width: 83.9rem;
      height: 67rem;
      object-fit: cover;
      border-radius: 1.4rem 1.4rem 0 0;
    }

    & > span {
      border-radius: 2rem;
      width: 14.2rem;
      height: 4.1rem;
      font-size: var(--font-size-big);
      left: 4.1rem;
      top: 4.1rem;
    }

    & > p {
      justify-self: end;
      padding: 1.4rem 0;
      color: var(--color-cloudy-gray);
    }

    & > button {
      width: max-content;
      margin-top: 2rem;
      padding: 1rem;
      border: 0.1rem solid var(--color-storm-gray);
      color: var(--color-storm-gray);
      border-radius: 0.8rem;
      font-size: var(--font-size-tiny);
      background-color: transparent;

      &:hover {
        background-color: var(--color-cloudy-gray);
        color: var(--white);
      }
    }
  }
`;
