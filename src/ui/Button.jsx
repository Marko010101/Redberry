import styled, { css } from "styled-components";

const Button = styled.button`
  padding: 1rem 1.6rem;
  
  padding: ${(props) => props.p && props.p};
  font-weight: var(--font-weight-medium);

  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: var(--color-primary);
      color: var(--white);
      border-radius: 1rem;

      :hover {
        background-color: var(--color-secondary);
      }

      & svg {
        fill: var(--white);
      }
    `}

  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: var(--white);
      color: var(--color-primary);
      border: 1px solid var(--color-primary);
      border-radius: 1rem;

      & svg {
        fill: var(--color-primary);
      }
    `}
`;

export default Button;