import styled from "styled-components";
import { StyledDropdown } from "./StyledDropdown.jsx";
import { InputText } from "./InputText.jsx";

const StyledDropdownInput = styled(StyledDropdown)`
  display: flex;
  flex-direction: column;
  width: max-content;
`;

const StyledInput = styled(InputText)`
  width: 4.1rem;
  padding: 1rem;
`;

const Dropdownbedroom = ({ onClick, title }) => {
  return (
    <StyledDropdownInput onClick={onClick}>
      <h4>{title}</h4>
      <StyledInput
        type="text"
        maxLength={2} 
      />
    </StyledDropdownInput>
  );
};

export default Dropdownbedroom;
