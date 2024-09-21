import styled from "styled-components";

const StyledRadioInput = styled.div`
  display: flex;
  gap: 8.4rem;
  align-items: center;
  font-size: var(--font-size-small);
  & label {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    cursor: pointer;

    & input[type="radio"] {
      display: flex;
      align-items: center;
      justify-content: center;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 1.7rem;
      height: 1.7rem;
      border: 0.1rem solid var(--color-text);
      border-radius: 50%;
      cursor: pointer;
      outline: none;
    }

    & input[type="radio"]:checked::before {
      content: "";
      display: block;
      width: 0.7rem;
      height: 0.7rem;
      background-color: var(--color-text);
      border-radius: 50%;
    }
  }
`;

const RadioInput = ({ formValues, handleInputChange }) => {
  return (
    <StyledRadioInput>
      <label>
        <input
          type="radio"
          name="is_rental"
          value="0"
          checked={formValues.is_rental === "0"}
          onChange={handleInputChange}
        />
        იყიდება
      </label>
      <label>
        <input
          type="radio"
          name="is_rental"
          value="1"
          checked={formValues.is_rental === "1"}
          onChange={handleInputChange}
        />
        ქირავდება
      </label>
    </StyledRadioInput>
  );
};

export default RadioInput;
