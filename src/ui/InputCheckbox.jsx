import styled from "styled-components";

export const InputCheckbox = styled.input`
  width: 2rem;
  height: 2rem;
  background-color: var(--color-very-light-gray);
  border-radius: 0.25rem;
  appearance: none;
  position: relative;

  &:checked {
    background-color: limegreen;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0.08rem;
    left: 0.7rem;
    width: 0.7rem;
    height: 1.3rem;
    border: 0.25rem solid transparent;
    border-left: none;
    border-top: none;
    transform: rotate(45deg) scale(1);
  }

  &:checked::before {
    border-color: var(--white);
  }
`;
