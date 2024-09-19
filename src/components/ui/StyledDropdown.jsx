import styled from "styled-components";

export const StyledDropdown = styled.div`
  position: absolute;
  border: 0.1rem solid var(--color-light-gray);
  box-shadow: 0.5rem 0.5rem 1.2rem 0rem rgba(2, 21, 38, 0.08);
  cursor: default;
  background-color: var(--white);
  z-index: 1000;
  left: -0.8rem;
  top: 5rem;
  border-radius: 1rem;
  padding: 2.4rem;

  & h4 {
    grid-column: 1 / -1;
    margin-bottom: 1.6rem;
    font-size: var(--font-size-medium);
  }
`;
