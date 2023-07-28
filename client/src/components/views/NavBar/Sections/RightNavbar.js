import React from "react";
import styled from "@emotion/styled";
import { FaRegUserCircle } from "react-icons/fa";
import { USER_SERVER } from "../../../Config";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
function RightNavbar(props) {
  const user = useSelector((state) => state.user);

  if (user.userData && !user.userData.isAuth) {
    return (
      <Container>
        <ButtonWrapper href="/login">
          <RegUserIcon />
          <LoginText>로그인</LoginText>
        </ButtonWrapper>
      </Container>
    );
  } else {
    return (
      <Container>
        <AddVideoButton href="/upload">
          <AddVideoButtonImage src="/images/AddVideoButton2.png" />
        </AddVideoButton>
        <UserIcon src={user.userData.image} onClick={props.handleModal} />
      </Container>
    );
  }
}
// commons
const Container = styled.div``;

const ButtonWrapper = styled.a`
  border: 1px solid #2e2e2e;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  display: inline-block;
  padding: 5px 15px;
`;

const RegUserIcon = styled(FaRegUserCircle)`
  color: #2c73b9;
  font-size: 20px;
  vertical-align: middle;
  margin-right: 5px;
`;

const LoginText = styled.span`
  color: #2c73b9;
  vertical-align: bottom;
`;

// After Login
const AddVideoButton = styled.a`
  width: 30px;
  height: 24px;
  cursor: pointer;
`;

const AddVideoButtonImage = styled.img`
  vertical-align: middle;
  width: inherit;
  height: inherit;
  margin-bottom: 3px;
  margin-right: 10px;
`;

const UserIcon = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  vertical-align: top;
  margin-right: 10px;
  cursor: pointer;
`;

export default RightNavbar;
