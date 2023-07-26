import styled from "@emotion/styled";
import LeftNavbar from "./Sections/LeftNavbar";
import CenterNavbar from "./Sections/CenterNavbar";
import RightNavbar from "./Sections/RightNavbar";

function NavBar() {
  return (
    <Container>
      <LeftNavbar />
      <CenterNavbar />
      <RightNavbar />
    </Container>
  );
}

const Container = styled.nav`
  overflow: auto;
  background-color: #111111;
  position: fixed;
  width: 100%;
  height: 56px;
  z-index: 5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default NavBar;
