import { Link } from "react-router-dom";
import styled from "styled-components";

import logoPng from "../../assets/logoPng.png";

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
    height: 2.4rem;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <img src={logoPng} alt="Logo" />
      </Link>
    </StyledHeader>
  );
};

export default Header;
