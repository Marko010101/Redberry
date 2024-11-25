import { useRealEstate } from "../hooks/useRealEstate.js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import PlusVector from "../assets/plusVector.svg?react";

import Button from "../components/ui/Button.jsx";
import FilterList from "../components/FilterList.jsx";
import Loader from "../components/ui/Loader.jsx";
import FiltersList from "../components/FiltersList.jsx";
import { useAgentModal } from "../context/agentModalContext.jsx";

const ListPage = () => {
  const navigate = useNavigate();
  const { list, isLoading, error } = useRealEstate();
  const { handleToggleAgentModal } = useAgentModal();

  const handleNavigate = () => {
    navigate("/real-estate/create");
  };

  if (isLoading) return <Loader />;
  if (error) return;

  return (
    <>
      <StyledFilter>
        <FilterList />

        <div>
          <Button variant="primary" onClick={handleNavigate}>
            <span>
              <PlusVector />
            </span>
            <p>ლისტინგის დამატება</p>
          </Button>
          <Button variant="secondary" onClick={handleToggleAgentModal}>
            <span>
              <PlusVector />
            </span>
            <p>აგენტის დამატება</p>
          </Button>
        </div>
      </StyledFilter>

      <FiltersList list={list} />
    </>
  );
};
export default ListPage;

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

    @media screen and (max-width: 1600px) {
      width: max-content;
    }
    @media screen and (max-width: 1200px) {
      align-self: center;
      gap: 2rem;
    }
    @media screen and (max-width: 768px) {
      gap: 0rem;
    }
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    & button {
      display: flex;
      align-items: center;
      gap: 0.2rem;

      & > span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.2rem;
        height: 2.2rem;
      }
    }
  }

  @media screen and (max-width: 1600px) {
    padding: 0rem 3.5rem;
  }
  @media screen and (max-width: 1200px) {
    margin-top: 5rem;
    flex-direction: column-reverse;

    & > div {
      justify-content: flex-end;
      margin-bottom: 3rem;
    }
  }
`;
