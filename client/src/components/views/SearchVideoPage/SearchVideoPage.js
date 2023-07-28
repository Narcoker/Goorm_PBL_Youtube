import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CategoryOptions } from "../../Constants";
import VideoItem from "./sections/VideoItem";
import { useSelector } from "react-redux";

function SearchVideoPage(props) {
  const user = useSelector((state) => state.user);
  const [Videos, setVideos] = useState(props.searchVideos);
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

const CategoriesContainer = styled.div`
  margin-bottom: 25px;
`;

const CategoryButton = styled.button`
  margin-right: 5px;
  padding: 3px 10px;
  border-radius: 7px;
  font-weight: 500;
  color: ${(props) => (props.selected ? "black" : "white")};
  background-color: ${(props) => (props.selected ? "white" : "#292929")};
`;

const VideosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 15px;
  padding: 10px;
`;

export default SearchVideoPage;
