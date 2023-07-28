import styled from "@emotion/styled";
import LeftNavbar from "./Sections/LeftNavbar";
import CenterNavbar from "./Sections/CenterNavbar";
import RightNavbar from "./Sections/RightNavbar";
import SettingModal from "./Sections/SettingModal";
import { useState } from "react";

function NavBar(props) {
  const [isModalOpened, setisModalOpened] = useState(false);

  const handleModal = () => {
    setisModalOpened((prev) => !prev);
  };
  return (
    <Container>
      <LeftNavbar />
      <CenterNavbar setSearchVideos={props.setSearchVideos} />
      <RightNavbar handleModal={handleModal} />

      {isModalOpened && <SettingModal />}
    </Container>
  );
}

const Container = styled.nav`
  /* overflow: auto; */
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
