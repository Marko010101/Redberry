import styled from "styled-components";

const StyledRadioInput = styled.div`
  display: flex;
  gap: 3.2rem;
  align-items: center;

  & > label {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 2.3rem;

    & input[type="radio"] {
      display: none;
    }

    & span {
      height: 1.7rem;
      width: 1.7rem;
      border-radius: 50%;
      border: 0.2rem solid var(--color-text);
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    & span::after {
      content: "";
      height: 0.7rem;
      width: 0.7rem;
      background-color: var(--color-text);
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      border-radius: 50%;
      transition: transform 0.2s ease-in-out;
    }

    & input[type="radio"]:checked + span::after {
      transform: translate(-50%, -50%) scale(1);
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
        <span></span>
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
        <span></span>
      </label>
    </StyledRadioInput>
  );
};

export default RadioInput;
