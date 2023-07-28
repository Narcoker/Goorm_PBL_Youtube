import styled from "@emotion/styled";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { USER_SERVER } from "../../../Config";

function SettingModal() {
  const user = useSelector((state) => state.user);

  const history = useHistory();

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  return (
    <Container>
      <Item>
        <Left>
          <UserIcon src={user.userData.image} />
        </Left>
        <Right>
          <UserName>{user.userData.name}</UserName>
          <UserId>@user-{user.userData._id.slice(0, 10)}</UserId>
          <Text>Google 계정 관리</Text>
        </Right>
      </Item>

      <Item>
        <ButtonWrapper href="/">
          <LogoutText onClick={logoutHandler}>로그아웃</LogoutText>
        </ButtonWrapper>
      </Item>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  /* border: 1px solid red; */
  top: 100%;
  right: 0;
  z-index: 12;
  background-color: #282828;
  border-radius: 10px;
`;

const Item = styled.div`
  border-bottom: 1px solid #3e3e3e;
  display: flex;
  color: white;
  padding: 20px;
  padding-right: 60px;
`;

const Left = styled.div``;
const UserIcon = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  vertical-align: top;
  margin-right: 10px;
`;

const Text = styled.span`
  display: block;
  margin-top: 7px;
  color: #2c73b9;
`;

const Right = styled.div``;

const UserName = styled.span`
  display: block;
  font-weight: 600;
`;

const UserId = styled.span`
  display: block;
  font-weight: 600;
`;

const ButtonWrapper = styled.a``;

const LogoutText = styled.span`
  color: white;
`;

export default SettingModal;
