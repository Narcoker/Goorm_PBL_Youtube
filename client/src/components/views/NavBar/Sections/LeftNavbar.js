import React from "react";
import styled from "@emotion/styled";
import Logo from "./Logo";

function LeftNavbar() {
  return (
    <Container>
      <SidbarControlButton />
      <Logo width={"90px"} height={"20px"} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const SidbarControlButton = styled.div`
  width: 20px;
  height: 14px;
  margin: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid white;
  border-top: 1px solid white;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    background-color: white;
    width: inherit;
    height: 1px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
`;

export default LeftNavbar;
