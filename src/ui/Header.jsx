import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.div`
  height: 10rem;
  border-bottom: 1px solid var(--color-light-gray);
  display: flex;
  align-items: center;

  & a {
    max-width: var(--site-width);
    width: 100%;
    margin: 0 auto;
  }

  & img {
    width: 15rem;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <img src="logo.svg" />
      </Link>
    </StyledHeader>
  );
};

export default Header;
