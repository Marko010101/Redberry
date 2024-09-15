import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <h1>Sorry, this page isn`t available.</h1>
      <p>
        The link you followed may be broken, or the page may have been removed.
        <span onClick={moveBack}>
          Go back to <span>Redberry.</span>
        </span>
      </p>
    </StyledPageNotFound>
  );
}

export default PageNotFound;

const StyledPageNotFound = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 3.3rem;

  & p {
    margin-top: 3rem;
    flex-grow: 1;

    & span {
      cursor: pointer;

      & span {
        font-weight: var(--font-weight-semibold);
      }

      &:active {
        color: var(--color-gray-500);
      }
    }
  }

  & footer {
    align-self: center;
  }
`;
