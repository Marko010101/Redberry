import styled from "styled-components";
import { StyledDropdown } from "./StyledDropdown.jsx";
import { InputText } from "./InputText.jsx";
import Button from "./Button.jsx";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const StyledDropdownInput = styled(StyledDropdown)`
  display: flex;
  flex-direction: column;
  width: max-content;
`;

const StyledInput = styled(InputText)`
  width: 4.1rem;
  padding: 1rem;
  text-align: center;
`;

const StyledButton = styled(Button)`
  font-size: var(--font-size-small);
  align-self: flex-end;
  margin-top: 3.2rem;
`;

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
        value={bedroomValue}
        onChange={handleInputChange}
      />
      <StyledButton
        type="primary"
        p="0.8rem 1.4rem"
        onClick={handleButtonClick}
      >
        არჩევა
      </StyledButton>
    </StyledDropdownInput>
  );
};

export default Dropdownbedroom;
