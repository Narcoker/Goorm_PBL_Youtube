import styled from "@emotion/styled";
import React from "react";
function SideVideoItem(props) {
  const minutes = Math.floor(props.video.duration / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(props.video.duration - minutes * 60)
    .toString()
    .padStart(2, "0");

  return (
    <VideoContainer href={`/video/${props.video._id}`}>
      <ThumbnailWrapper>
        <Thumbnail src={`http://localhost:9999/${props.video.thumbnail}`} />
        <Duration>
          {minutes}:{seconds}
        </Duration>
      </ThumbnailWrapper>

      <MetaWrapper>
        <VideoTitle>{props.video.title}</VideoTitle>
        <Writer>{props.video.writer.nickname}</Writer>
        <Views>조회수 {props.video.view}회</Views>
      </MetaWrapper>
    </VideoContainer>
  );
}

const VideoContainer = styled.a`
  margin-bottom: 30px;
  text-decoration: none;
  transition: 0.5s;
  display: flex;
  gap: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const ThumbnailWrapper = styled.div`
  width: 168px;
  height: 94px;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  margin-bottom: 10px;
  transition: 0.5s;
  &:hover {
    border-radius: 0;
  }
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
`;
const Duration = styled.span`
  color: white;
  z-index: 5;
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: black;
  font-weight: 600;
  padding: 1px 3px;
  border-radius: 5px;
  font-size: 11px;
`;

const MetaWrapper = styled.div`
  width: 200px;
`;

const VideoTitle = styled.p`
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Writer = styled.p`
  color: #a9a9a9;
`;
const Views = styled.p`
  color: #a9a9a9;
`;

export default SideVideoItem;
