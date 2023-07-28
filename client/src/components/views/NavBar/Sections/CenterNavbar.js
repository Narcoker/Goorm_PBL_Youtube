import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function CenterNavbar(props) {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const onChangeQuery = (e) => {
    setQuery(e.target.value);
  };
  const searchHandle = () => {
    axios
      .post("/api/video/searchVideos", { query })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.videos);
          // 현재 컴포넌트의 상태를 업데이트하거나
          // 검색 결과를 다루는 다른 로직을 여기에 추가할 수 있습니다.
          props.setSearchVideos(response.data.videos);
          history.push("/search");
        } else {
          alert("비디오 검색에 실패했습니다.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const EnterButtonHandler = (e) => {
    if (e.key === "Enter") {
      searchHandle();
    }
  };
  return (
    <Container>
      <Search
        value={query}
        onChange={(e) => onChangeQuery(e)}
        onKeyUp={(e) => EnterButtonHandler(e)}
        placeholder="검색"
      />
      <SubmitButton onClick={searchHandle}>
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
  width: 25vw;
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
