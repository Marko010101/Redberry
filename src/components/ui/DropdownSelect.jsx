import { useState, useEffect } from "react";
import styled from "styled-components";

import ArrowDown from "../../assets/arrowDown.svg?react";
import PlusCircle from "../../assets/plus-circle.svg?react";
import ArrowUp from "../../assets/arrowUp.svg?react";
import Done from "../../assets/done.svg?react";

import { useOutsideClick } from "../../hooks/useOutsideClick.js";
import { useAgentModal } from "../../context/agentModalContext.jsx";
import { StyledText } from "./StyledText.jsx";

const DropdownSelect = ({
  name,
  handleAction,
  data,
  defaultText,
  reset,
  isAgent = false,
  validationText,
  errors,
  errorText,
}) => {
  const { handleToggleAgentModal } = useAgentModal();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  // Fetch saved form values from localStorage on component mount
  useEffect(() => {
    const savedFormValues = JSON.parse(localStorage.getItem("formValues"));
    if (savedFormValues && savedFormValues[name]) {
      const savedId = savedFormValues[name];
      const foundItem = data?.find((item) => item.id === savedId);
      if (foundItem) {
        setSelectedItem(foundItem.name); // Set the display value based on the saved ID
      }
    }
  }, [data, name]);

  // Ensure the selected item is updated when a new item is selected
  useEffect(() => {
    const savedFormValues = JSON.parse(localStorage.getItem("formValues"));
    if (savedFormValues && savedFormValues[name]) {
      const savedId = savedFormValues[name];
      const foundItem = data?.find((item) => item.id === savedId);
      if (foundItem) {
        setSelectedItem(foundItem.name); // Set the display value based on the saved ID
      }
    }
  }, [selectedItem, data, name]);

  // Reset the selected item if the reset prop is triggered
  useEffect(() => {
    if (reset) {
      setSelectedItem(null);
    }
  }, [reset]);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (id, itemName) => {
    handleAction({ target: { name, value: id } });

    // Update the selected item
    setSelectedItem(itemName);

    // Update localStorage with the new selected item
    const savedFormValues =
      JSON.parse(localStorage.getItem("formValues")) || {};
    savedFormValues[name] = id;
    localStorage.setItem("formValues", JSON.stringify(savedFormValues));

    setIsOpen(false);
  };

  return (
    <StyledDropdownBox>
      <StyledDropdown ref={dropdownRef} isOpen={isOpen}>
        <ul>
          <p onClick={handleToggle}>
            {selectedItem || defaultText}
            <span>{isOpen ? <ArrowUp /> : <ArrowDown />}</span>
          </p>
          {isAgent && isOpen && (
            <li onClick={handleToggleAgentModal}>
              <span>
                <PlusCircle />
              </span>
              დაამატე აგენტი
            </li>
          )}
          {isOpen &&
            data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item.id, item.name)}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </StyledDropdown>
      <StyledErrorSuccessText
        isError={
          errors[name] === validationText[name] || errors[name] === errorText
        }
        isSuccess={errors[name] === errorText[name]}
      >
        {errors[name] !== errorText && <span>{<Done />}</span>}
        {errors[name] || validationText[name]}
      </StyledErrorSuccessText>
    </StyledDropdownBox>
  );
};

export default DropdownSelect;

const StyledDropdownBox = styled.div`
  position: relative;
  width: 100%;
`;

const StyledDropdown = styled.div`
  border: 0.1rem solid var(--color-cloudy-gray);
  border-radius: 0.6rem;
  font-size: var(--font-size-small);
  user-select: none;
  position: absolute;

  z-index: ${(props) => (props.isOpen ? "1000" : "100")};
  background-color: var(--white);
  max-height: 20.7rem;
  overflow: auto;
  width: 38.4rem;

  & > ul {
    width: 100%;

    & p {
      cursor: pointer;
      padding: 1.25rem 1rem;
      position: relative;

      & > span {
        display: flex;
        position: absolute;
        left: 34rem;
        top: 50%;
        transform: translateY(-50%);
      }

      &:hover {
        background-color: var(--color-very-light-gray);
      }
    }

    & li {
      cursor: pointer;
      border-bottom: 0.1rem solid var(--color-cloudy-gray);
      padding: 1rem;
      height: 4.2rem;
      max-height: 4.2rem;
      &:hover {
        background-color: var(--color-very-light-gray);
      }
    }
    & li {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      & > span {
        display: flex;
        align-items: center;
        & > svg {
          width: 2rem;
          height: 2rem;
        }
      }
    }
    & li:last-child {
      border-bottom: none;
    }
    & > li:first-of-type {
      border-top: 0.1rem solid var(--color-cloudy-gray);
    }
  }
`;

const StyledErrorSuccessText = styled(StyledText)`
  position: absolute;
  z-index: 200;
  top: 4.5rem;
`;
