import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CategoryOptions } from "../../Constants";
import VideoItem from "./sections/VideoItem";
import { useSelector } from "react-redux";

function MyVideoPage() {
  const user = useSelector((state) => state.user);
  const [Videos, setVideos] = useState([]);
  const [categoris, setCategories] = useState([
    {
      value: 0,
      label: "전체",
      selected: true,
    },
    ...CategoryOptions,
  ]);

  const handleCategory = (index) => {
    const newCategories = categoris.map((category, idx) => {
      return { ...category, selected: idx === index };
    });

    setCategories(newCategories);
  };
  useEffect(() => {
    axios
      .post("/api/video/getMyVideos", { userId: user.userData._id })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setVideos(response.data.videos);
        } else {
          alert("비디오 가져오기를 실패했습니다.");
        }
      });
  }, []);
  return (
    <>
      <Container>
        <VideosContainer>
          {Videos.map((video) => (
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

export default MyVideoPage;
