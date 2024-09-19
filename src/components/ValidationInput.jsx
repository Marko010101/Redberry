import { InputText } from "./ui/InputText.jsx";

import Done from "../assets/done.svg?react";
import { StyledText } from "./ui/StyledText.jsx";

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
    <div>
      <p className="TextBolder">{fieldName} *</p>
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
    </div>
  );
};

export default ValidationInput;
