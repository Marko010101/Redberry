import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header.jsx";

const StyledMain = styled.main`
  max-width: var(--site-width);
  width: 100%;
  margin: 0 auto;
`;

const AppLayout = () => {
  return (
    <>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </>
  );
};

export default AppLayout;
