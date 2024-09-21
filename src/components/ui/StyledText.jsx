import styled from "styled-components";

export const StyledText = styled.p`
  font-size: var(--font-size-small);
  display: flex;
  align-items: center;
  gap: 0.7rem;

  color: ${({ isError, isSuccess }) =>
    isError ? "red" : isSuccess ? "green" : "inherit"};

  & span {
    width: 1.3rem;
    height: 1.1rem;
    display: flex;
    & svg {
      stroke: ${({ isError, isSuccess }) =>
        isError ? "red" : isSuccess ? "green" : "var(--color-text)"};
    }
  }
`;
