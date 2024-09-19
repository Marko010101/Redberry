import { Link } from "react-router-dom";
import styled from "styled-components";

import HeaderLogo from "../../assets/logo.svg?react";

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

  & svg {
    width: 15rem;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <HeaderLogo />
      </Link>
    </StyledHeader>
  );
};

export default Header;
