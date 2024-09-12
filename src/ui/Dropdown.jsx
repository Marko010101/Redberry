import styled from "styled-components";

import Button from "./Button.jsx";
import { InputCheckbox } from "./InputCheckbox.jsx";
import { StyledDropdown } from "./StyledDropdown.jsx";

const StyledDropdownCheckbox = styled(StyledDropdown)`
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  display: grid;
  width: 73rem;
  column-gap: 3.2rem;
  row-gap: 1.6rem;

  & label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  & label,
  & input,
  & span {
    cursor: pointer;
  }

  & > button {
    grid-column: 1 / -1;
    justify-self: end;
    margin-top: 3.2rem;
  }
`;

const StyledButton = styled(Button)`
  font-size: var(--font-size-small);
`;

const Dropdown = ({ data, onClick, title }) => {
  console.log(data);
  return (
    <StyledDropdownCheckbox onClick={onClick}>
      <h4>{title}</h4>
      {data?.map((region) => (
        <label key={region.id}>
          <InputCheckbox type="checkbox" value={region.name} />
          <span>{region.name}</span>
        </label>
      ))}
      <StyledButton type="primary" p="0.8rem 1.4rem">
        არჩევა
      </StyledButton>
    </StyledDropdownCheckbox>
  );
};

export default Dropdown;
