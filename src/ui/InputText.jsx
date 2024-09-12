import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 15.5rem;
`;

export const InputText = styled.input`
  width: 100%;
  border-radius: 0.6rem;
  border: 0.1rem solid var(--color-border-input);
  padding: 1rem;
  padding-right: 2.5rem;
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
