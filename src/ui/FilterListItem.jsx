import styled from "styled-components";

import ArrowUp from "../../public/arrowUp.svg?react";
import ArrowDown from "../../public/arrowDown.svg?react";
import DropdownInput from "./DropdownInput.jsx";
import Dropdown from "./Dropdown.jsx";
import Dropdownbedroom from "./Dropdownbedroom.jsx";

const StyledLi = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.8rem 1.4rem;
  border-radius: 0.6rem;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  background-color: ${(props) =>
    props.isOpen ? "var(--color-very-light-gray)" : "transparent"};
`;

function FilterListItem({
  children,
  isOpen,
  onToggle,
  data,
  title,
  dropdownType,
}) {
  return (
    <StyledLi onClick={onToggle} isOpen={isOpen}>
      {children} {isOpen ? <ArrowUp /> : <ArrowDown />}
      {isOpen && dropdownType === "checkbox" && (
        <Dropdown
          data={data}
          title={title}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      {isOpen && dropdownType === "input" && (
        <DropdownInput title={title} onClick={(e) => e.stopPropagation()} />
      )}
      {isOpen && dropdownType === "bedroom" && (
        <Dropdownbedroom title={title} onClick={(e) => e.stopPropagation()} />
      )}
    </StyledLi>
  );
}

export default FilterListItem;
