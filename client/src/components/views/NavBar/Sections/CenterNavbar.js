import React from "react";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";

function CenterNavbar() {
  return (
    <Container>
      <Search placeholder="검색" />
      <SubmitButton>
        <FaSearch style={{ backgroundColor: "transparent", color: "white" }} />
      </SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 20px;
  border: 1px solid #2e2e2e;
  overflow: hidden;
  height: 30px;
  /* margin-left: 100px; */
`;

const Search = styled.input`
  background-color: #121212;
  padding: 5px 10px;
  width: 500px;
  padding-left: 15px;
  color: white;
  outline: none;
  border: none;
`;

const SubmitButton = styled.button`
  background-color: #2e2e2e;
  outline: none;
  display: inline-block;
  background: #2e2e2e;
  height: inherit;
  text-align: center;
  width: 80px;
  height: 100%;
  cursor: pointer;
`;

export default CenterNavbar;
