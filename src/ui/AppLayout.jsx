import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const StyledMain = styled.main`
  padding: 20px;
  background-color: var(--color-brand-50);
  overflow: scroll;
`;

function AppLayout() {
  return (
    <>
      <StyledLayout>
        <Header />
        <Sidebar />
        <StyledMain>
          <Outlet />
        </StyledMain>
      </StyledLayout>
    </>
  );
}

export default AppLayout;
