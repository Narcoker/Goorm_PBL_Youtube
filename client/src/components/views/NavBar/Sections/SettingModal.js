import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { USER_SERVER } from "../../../Config";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

function SettingModal(props) {
  const user = useSelector((state) => state.user);

  const history = useHistory();

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        history.push("/login");
      } else {
        toast.error("로그아웃하는데 실패했습니다.", { autoClose: 1500 });

      }
    });
  };

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <Container ref={modalRef}>
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

      <Item onClick={logoutHandler}>
        <LogOutIcon />
        <LogoutText>로그아웃</LogoutText>
      </Item>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  /* border: 1px solid red; */
  top: 100%;
  right: 15px;
  z-index: 12;
  background-color: #292929;
  border-radius: 10px;
`;

const Item = styled.div`
  border-bottom: 1px solid #3e3e3e;
  display: flex;
  color: white;
  padding: 20px;
  padding-right: 60px;
  cursor: pointer;

  &:last-child {
    border-bottom: 1px solid transparent;
  }

  &:hover {
    background-color: #393939;
  }
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

const ButtonWrapper = styled.a`
  text-decoration: none;
`;
const LogOutIcon = styled(FiLogOut)`
  color: white;
  margin-right: 10px;
  font-size: 16px;
  transform: translateY(2px);
`;
const LogoutText = styled.span`
  color: white;
`;

export default SettingModal;
