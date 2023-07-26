import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { FaRegUserCircle } from "react-icons/fa";
import { USER_SERVER } from "../../../Config";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
function RightNavbar() {
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
  useEffect(() => {
    console.log("test: ", user);
  }, [user]);
  if (user.userData && !user.userData.isAuth) {
    return (
      <Container>
        <ButtonWrapper href="/login">
          <FaRegUserCircle
            style={{
              color: "#2c73b9",
              fontSize: "20px",
              verticalAlign: "middle",
              marginRight: "5px",
            }}
          ></FaRegUserCircle>
          <LoginText>로그인</LoginText>
        </ButtonWrapper>
      </Container>
    );
  } else {
    return (
      <Container>
        <span>{user.userData.name}</span>
        <ButtonWrapper href="/login">
          {/* <FaRegUserCircle
            style={{
              color: "#2c73b9",
              fontSize: "20px",
              verticalAlign: "middle",
              marginRight: "5px",
            }}
          ></FaRegUserCircle> */}
          <LoginText onClick={logoutHandler}>로그아웃</LoginText>
        </ButtonWrapper>
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

const LoginText = styled.span`
  color: #2c73b9;
  vertical-align: bottom;
`;

// After Login

export default RightNavbar;
