import styled from "@emotion/styled";
import React from "react";
function VideoItem(props) {
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
        <MetaLeft>
          <UserIcon src={props.video.writer.image} />
        </MetaLeft>
        <MetaRight>
          <VideoTitle>{props.video.title}</VideoTitle>
          <Writer>{props.video.writer.name}</Writer>
          <Views>조회수 </Views>
        </MetaRight>
      </MetaWrapper>
    </VideoContainer>
  );
}

const VideoContainer = styled.a`
  margin-bottom: 30px;
  height: 65%;
  text-decoration: none;
  transition: 0.5s;

  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
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
  right: 10px;
  background: black;
  font-weight: 600;
  padding: 1px 3px;
  border-radius: 5px;
`;

const MetaWrapper = styled.div`
  display: flex;
`;

const MetaLeft = styled.div``;
const UserIcon = styled.img`
  border-radius: 50%;
  width: 36px;
  height: 36px;
`;

const MetaRight = styled.div`
  padding-left: 10px;
`;
const VideoTitle = styled.p`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;
const Writer = styled.p`
  color: #a9a9a9;
`;
const Views = styled.p`
  color: #a9a9a9;
`;

export default VideoItem;
