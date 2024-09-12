import styled from "styled-components";

import { StyledDropdown } from "./StyledDropdown.jsx";
import { CurrencySymbol, InputText, InputWrapper } from "./InputText.jsx";
import Button from "./Button.jsx";

const StyledDropdownInput = styled(StyledDropdown)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1.5rem;

  & > div {
    display: flex;
    flex-direction: column;

    & p {
      margin-top: 2.4rem;
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-medium);
    }
    & > span {
      margin-top: 0.8rem;
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-regular);
    }
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

const DropdownInput = ({ onClick, title }) => {
  const symbol = title === "ფასის მიხედვით" ? "₾" : "მ²";
  const text = title === "ფასის მიხედვით" ? "ფასი" : "მ²";

  return (
    <StyledDropdownInput onClick={onClick}>
      <h4>{title}</h4>
      <div>
        <InputWrapper>
          <InputText type="text" placeholder="დან" />
          <CurrencySymbol>{symbol}</CurrencySymbol>
        </InputWrapper>
        <p>მინ. {text}</p>
        <span>50,000 {symbol}</span>
        <span>100,000 {symbol}</span>
        <span>150,000 {symbol}</span>
        <span>200,000 {symbol}</span>
        <span>300,000 {symbol}</span>
      </div>
      <div>
        <InputWrapper>
          <InputText type="text" placeholder="დან" />
          <CurrencySymbol>{symbol}</CurrencySymbol>
        </InputWrapper>
        <p>მაქს. {text}</p>
        <span>50,000 {symbol}</span>
        <span>100,000 {symbol}</span>
        <span>150,000 {symbol}</span>
        <span>200,000 {symbol}</span>
        <span>300,000 {symbol}</span>
      </div>

      <StyledButton type="primary" p="0.8rem 1.4rem">
        არჩევა
      </StyledButton>
    </StyledDropdownInput>
  );
};

export default DropdownInput;
// მ²
