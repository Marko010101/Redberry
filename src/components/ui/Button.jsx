import styled, { css } from "styled-components";

const Button = styled.button`
  padding: 1rem 1.6rem;
  height: 4.7rem;

  padding: ${(props) => props.p && props.p};
  font-weight: var(--font-weight-medium);

  ${(props) =>
    props.variant === "primary" &&
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
    props.variant === "secondary" &&
    css`
      background-color: var(--white);
      color: var(--color-primary);
      border: 1px solid var(--color-primary);
      border-radius: 1rem;

      :hover {
        color: var(--white);
        background-color: var(--color-primary);
      }

      :hover svg {
        fill: var(--white);
      }

      & svg {
        fill: var(--color-primary);
      }
    `}
`;

export default Button;
