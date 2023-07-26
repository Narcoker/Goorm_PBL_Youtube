import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: column;
  background-color: #111111;
  width: 64px;
  height: 100vh;
`;

export const Icon = styled.a`
  display: inline-block;
  width: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 0px;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #222222;
  }
`;

export const Svg = styled.svg`
  pointer-events: none;
  display: block;
  width: 24px;
  height: 24px;
  display: block;
`;

export const IconText = styled.span`
  color: white;
  font-size: 8px;
  display: block;
  text-align: center;
`;
