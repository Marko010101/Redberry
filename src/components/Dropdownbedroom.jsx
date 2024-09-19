import styled from "styled-components";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { StyledDropdown } from "./ui/StyledDropdown.jsx";
import { InputText } from "./ui/InputText.jsx";
import Button from "./ui/Button.jsx";

const Dropdownbedroom = ({ onClick, title, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bedroomValue, setBedroomValue] = useState(
    searchParams.get("bedroom") || ""
  );

  const handleInputChange = (e) => {
    setBedroomValue(e.target.value);
  };

  const handleButtonClick = () => {
    // Update search params
    const newParams = new URLSearchParams(searchParams);
    if (bedroomValue) {
      newParams.set("bedroom", bedroomValue);
    } else {
      newParams.delete("bedroom");
    }
    setSearchParams(newParams);
    onClose();
  };

  return (
    <StyledDropdownInput onClick={onClick}>
      <h4>{title}</h4>
      <StyledInput
        type="number"
        onWheel={(e) => e.target.blur()}
        value={bedroomValue}
        onChange={handleInputChange}
      />
      <StyledButton
        variant="primary"
        p="0.8rem 1.4rem"
        onClick={handleButtonClick}
      >
        არჩევა
      </StyledButton>
    </StyledDropdownInput>
  );
};

export default Dropdownbedroom;

const StyledDropdownInput = styled(StyledDropdown)`
  display: flex;
  flex-direction: column;
  width: max-content;
`;

const StyledInput = styled(InputText)`
  width: 4.1rem;
  text-align: center;
`;

const StyledButton = styled(Button)`
  font-size: var(--font-size-small);
  align-self: flex-end;
  margin-top: 3.2rem;

  &:hover {
    background-color: var(--color-secondary);
  }
`;
