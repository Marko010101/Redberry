import styled from "styled-components";

export const StyledText = styled.p`
  font-size: var(--font-size-small);
  display: flex;
  align-items: center;
  gap: 0.7rem;

  color: ${({ isError, isSuccess }) =>
    isError ? "red" : isSuccess ? "green" : "inherit"};

  & svg {
    width: 1rem;
    height: 0.82rem;

    stroke: ${({ isError, isSuccess }) =>
      isError ? "red" : isSuccess ? "green" : "var(--color-text)"};
  }
`;
