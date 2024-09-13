import styled, { css } from "styled-components";

import { StyledDropdown } from "./StyledDropdown.jsx";
import { CurrencySymbol, InputText, InputWrapper } from "./InputText.jsx";
import Button from "./Button.jsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DropdownInput = ({ onClick, title, onClose }) => {
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const isPriceFilter = title === "ფასის მიხედვით";
  let isValid = maxValue >= minValue || maxValue === "";

  useEffect(() => {
    const minParam = isPriceFilter
      ? searchParams.get("minPrice")
      : searchParams.get("minArea");
    const maxParam = isPriceFilter
      ? searchParams.get("maxPrice")
      : searchParams.get("maxArea");

    if (minParam) setMinValue(minParam);
    else setMinValue("");

    if (maxParam) setMaxValue(maxParam);
    else setMaxValue("");
  }, [searchParams, isPriceFilter]);

  const handleSave = () => {
    const newParams = new URLSearchParams(searchParams);

    if (isPriceFilter) {
      if (minValue && minValue !== "0") newParams.set("minPrice", minValue);
      else newParams.delete("minPrice");

      if (maxValue) newParams.set("maxPrice", maxValue);
      else newParams.delete("maxPrice");
    } else {
      if (minValue && minValue !== "0") newParams.set("minArea", minValue);
      else newParams.delete("minArea");

      if (maxValue) newParams.set("maxArea", maxValue);
      else newParams.delete("maxArea");
    }

    if (isValid) setSearchParams(newParams);
    if (isValid) onClose();
  };

  const symbol = title === "ფასის მიხედვით" ? "₾" : "მ²";
  const text = title === "ფასის მიხედვით" ? "ფასი" : "მ²";

  return (
    <StyledDropdownInput onClick={onClick} isValid={isValid}>
      <h4>{title}</h4>
      <div>
        <InputWrapper>
          <InputText
            type="number"
            placeholder="დან"
            min={50000}
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />
          <CurrencySymbol>{symbol}</CurrencySymbol>
        </InputWrapper>
        {!isValid && <p className="errorText">ჩაწერეთ ვალიდური მონაცემები</p>}
        <p>მინ. {text}</p>
        <span>50,000 {symbol}</span>
        <span>100,000 {symbol}</span>
        <span>150,000 {symbol}</span>
        <span>200,000 {symbol}</span>
        <span>300,000 {symbol}</span>
      </div>
      <div>
        <InputWrapper>
          <InputText
            type="number"
            placeholder="დან"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
          <CurrencySymbol>{symbol}</CurrencySymbol>
        </InputWrapper>
        <p>მაქს. {text}</p>
        <span>50,000 {symbol}</span>
        <span>100,000 {symbol}</span>
        <span>150,000 {symbol}</span>
        <span>200,000 {symbol}</span>
        <span>300,000 {symbol}</span>
      </div>

      <StyledButton type="primary" p="0.8rem 1.4rem" onClick={handleSave}>
        არჩევა
      </StyledButton>
    </StyledDropdownInput>
  );
};

export default DropdownInput;

const StyledDropdownInput = styled(StyledDropdown)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5rem;

  & > div {
    display: grid;
    position: relative;

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

    & > .errorText {
      position: absolute;
      top: 1.95rem;
      width: max-content;
      color: var(--color-primary);
      font-size: var(--font-size-tiny);
    }
  }

  & input {
    ${(props) =>
      !props.isValid &&
      css`
        border: 0.1rem solid var(--color-primary);
      `}
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
