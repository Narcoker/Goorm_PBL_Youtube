/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as S from "./Sidbar.style";

function Sidebar() {
  return (
    <S.Container>
      <S.Icon>
        <S.Svg
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          focusable="false"
        >
          <g>
            <path
              d="m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z"
              fill="white"
            ></path>
          </g>
        </S.Svg>
        <S.IconText>홈</S.IconText>
      </S.Icon>
      <S.Icon>
        <S.Svg
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          focusable="false"
        >
          <g>
            <path
              d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"
              fill="white"
            ></path>
          </g>
        </S.Svg>
        <S.IconText>구독</S.IconText>
      </S.Icon>
      {/* <S.Icon>
        <S.Svg
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          focusable="false"
        >
          <g>
            <path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z" fill="white" />
          </g>
        </S.Svg>
        <S.IconText>시청 기록</S.IconText>
      </S.Icon> */}
    </S.Container>
  );
}

export default Sidebar;
