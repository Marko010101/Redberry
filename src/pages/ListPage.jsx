import { useRealEstate } from "../hooks/useRealEstate.js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

import PlusVector from "../assets/plusVector.svg?react";

import Button from "../components/ui/Button.jsx";
import FilterList from "../components/FilterList.jsx";
import Loader from "../components/ui/Loader.jsx";
import FilteredList from "../components/FilteredList.jsx";
import ModalAddListing from "../components/ModalAddAgent.jsx";

const ListPage = () => {
  const navigate = useNavigate();
  const { list, isLoading, error } = useRealEstate();
  const [isAgentModalOpen, setIsAgentModalOpen] = useState();

  const handleNavigate = () => {
    navigate("/real-estate/create");
  };
  function handleToggleAgentModal() {
    setIsAgentModalOpen((prev) => !prev);
  }

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

      <FilteredList list={list} />

      {isAgentModalOpen && (
        <ModalAddListing handleToggleAgentModal={handleToggleAgentModal} />
      )}
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
  }

  & > div {
    display: flex;
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
`;
