import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 15.5rem;
`;

export const InputText = styled.input`
  width: 100%;
  height: 4.2rem;
  border-radius: 0.6rem;

  border: 0.1rem solid var(--color-cloudy-gray);
  padding: 1rem;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
`;

export const CurrencySymbol = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: var(--color-text);
`;
