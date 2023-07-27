import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SideVideoItem from "./SideVideoItem";

function SideVideos() {
  const [sideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getvideos").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setSideVideos(response.data.videos);
      } else {
        alert("비디오 가져오기를 실패했습니다.");
      }
    });
  }, []);
  return (
    <Container>
      {sideVideos.map((video) => (
        <SideVideoItem key={video._id} video={video} />
      ))}
    </Container>
  );
}

const Container = styled.div``;

export default SideVideos;
