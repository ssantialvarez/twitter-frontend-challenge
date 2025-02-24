
import { Outlet } from "react-router-dom";
import { StyledSideBarPageWrapper } from "../../side-bar-page/SideBarPageWrapper";
import NavBar from "../../../components/navbar/NavBar";

const WithNav = () => {
    return (
      <StyledSideBarPageWrapper>
        <NavBar />
        <Outlet />
      </StyledSideBarPageWrapper>
    );
};

export default WithNav;