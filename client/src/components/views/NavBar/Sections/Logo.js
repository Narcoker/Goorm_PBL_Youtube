import React from "react";
import styled from "@emotion/styled";

const ImageWrapper = styled.a`
  position: relative;
  &::after {
    content: "KR";
    position: absolute;
    bottom: 50%;
    /* right: -15px; */
    right: ${(props) => (props.big ? "-3px" : "-15px")};
    color: white;
    font-size: 5px;
    color: #e2e2e2;
  }
`;

const Image = styled.img`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

function Logo(props) {
  return (
    <ImageWrapper big={props.big} href="/">
      <Image
        src={props.big ? "images/youtube-logo-big.png" : "/images/youtube-logo.png"}
        width={props.width}
        height={props.height}
      />
    </ImageWrapper>
  );
}

export default Logo;
