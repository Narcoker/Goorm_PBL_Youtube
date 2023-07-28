import styled from "@emotion/styled";
import React from "react";
import VideoItem from "./sections/VideoItem";

function SearchVideoPage(props) {
  return (
    <>
      <Container>
        <VideosContainer>
          {props.searchVideos.map((video) => (
            <VideoItem key={video._id} video={video} />
          ))}
        </VideosContainer>
      </Container>
    </>
  );
}
const Container = styled.div`
  height: calc(100vh - 56px);
  margin-left: 64px;
  background-color: #111111;
  padding: 0px 35px;
  overflow: auto;
`;

const VideosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 15px;
  padding: 10px;
`;

export default SearchVideoPage;
