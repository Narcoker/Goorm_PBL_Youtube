/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import * as S from "./Sidbar.style";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Sidebar(props) {
  useEffect(() => {
    console.log(props.curPage);
  }, [props.curPage]);

  const history = useHistory();

  const handleButton = (path) => {
    props.setCurPage(path);
    history.push(path);
  };
  return (
    <S.Container>
      <S.Icon onClick={() => handleButton("/")}>
        <S.Svg
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          focusable="false"
        >
          <g>
            {props.curPage === "/" ? (
              <path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z" fill="white"></path>
            ) : (
              <path
                d="m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z"
                fill="white"
              ></path>
            )}
          </g>
        </S.Svg>
        <S.IconText>홈</S.IconText>
      </S.Icon>
      <S.Icon onClick={() => handleButton("/subscribe")}>
        <S.Svg
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          focusable="false"
        >
          <g>
            {props.curPage === "/subscribe" ? (
              <path
                d="M20 7H4V6h16v1zm2 2v12H2V9h20zm-7 6-5-3v6l5-3zm2-12H7v1h10V3z"
                fill="white"
              ></path>
            ) : (
              <path
                d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"
                fill="white"
              ></path>
            )}
          </g>
        </S.Svg>
        <S.IconText>구독</S.IconText>
      </S.Icon>
      <S.Icon onClick={() => handleButton("/myvideo")}>
        <S.Svg
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          focusable="false"
        >
          <g>
            {props.curPage === "/myvideo" ? (
              <path
                d="M4 20h14v1H3V6h1v14zM21 3v15H6V3h15zm-4 7.5L11 7v7l6-3.5z"
                fill="white"
              ></path>
            ) : (
              <path
                d="m11 7 6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"
                fill="white"
              ></path>
            )}
          </g>
        </S.Svg>
        <S.IconText>내 동영상</S.IconText>
      </S.Icon>
    </S.Container>
  );
}

export default Sidebar;
