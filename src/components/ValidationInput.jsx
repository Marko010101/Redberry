import { InputText } from "./ui/InputText.jsx";

import Done from "../assets/done.svg?react";
import { StyledText } from "./ui/StyledText.jsx";
import styled from "styled-components";

const ValidationInput = ({
  fieldName,
  inputName,
  type,
  formValues,
  handleInputChange,
  errors,
  validationText,
  errorText,
}) => {
  return (
    <StyledValidationInput>
      <p>{fieldName} *</p>
      <InputText
        type={type}
        onWheel={type === "number" ? (e) => e.target.blur() : undefined}
        name={inputName}
        value={formValues[inputName]}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <StyledText
        isError={
          errors[inputName] === validationText[inputName] ||
          errors[inputName] === errorText
        }
        isSuccess={errors[inputName] === errorText[inputName]}
      >
        {errors[inputName] !== errorText && (
          <span>
            <Done />
          </span>
        )}
        {errors[inputName] || validationText[inputName]}
      </StyledText>
    </StyledValidationInput>
  );
};

export default ValidationInput;

const StyledValidationInput = styled.div`
  & > p:first-child {
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
  }
  & > p {
    font-size: var(--font-size-small);
  }

  & input {
    margin: 0.5rem 0 0.4rem 0;
  }
`;
