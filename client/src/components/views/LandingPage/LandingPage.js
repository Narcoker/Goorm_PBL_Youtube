import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { CategoryOptions } from "../../Constants";
import VideoItem from "./sections/VideoItem";
import { toast } from "react-toastify";

function LandingPage() {
  const ButtonsRef = useRef(null);
  const LeftRef = useRef(null);
  const RightRef = useRef(null);
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

    axios
      .post("/api/video/catagoryVideos", { category: categoris[index].label })
      .then((response) => {
        if (response.data.success) {
          setVideos(response.data.videos);
        } else {
          toast.error(`${categoris[index].label} 을 불러오지 못했습니다.`);
        }
      });
  };

  const handleLeftArrow = () => {
    if (ButtonsRef.current) {
      ButtonsRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const handleRightArrow = () => {
    if (ButtonsRef.current) {
      ButtonsRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };
  useEffect(() => {
    axios.get("/api/video/getvideos").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideos(response.data.videos);
      } else {
        toast.error("비디오 가져오기를 실패했습니다.", { autoClose: 1500 });
      }
    });
  }, []);

  return (
    <>
      <Container>
        <CategoriesContainer>
          <ArrowLeftButton ref={LeftRef} onClick={handleLeftArrow} />
          <ButtonWrapper ref={ButtonsRef}>
            {categoris.map((category, index) => (
              <CategoryButton
                selected={category.selected}
                onClick={() => handleCategory(index)}
              >
                {category.label}
              </CategoryButton>
            ))}
          </ButtonWrapper>
          <ArrowRightButton ref={RightRef} onClick={handleRightArrow} />
        </CategoriesContainer>

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
  /* position: fixed; */
  top: 55px;
  height: 40px;
  background-color: #111111;
  z-index: 5;
  width: calc(100vw - 140px);
`;

const ArrowLeftButton = styled(AiOutlineLeft)`
  position: absolute;
  left: -30px;
  top: 50%;
  color: white;
  transform: translateY(-85%);
`;
const ArrowRightButton = styled(AiOutlineRight)`
  position: absolute;
  right: -30px;
  top: 50%;
  color: white;
  transform: translateY(-85%);
`;

const CategoryButton = styled.button`
  margin-right: 5px;
  padding: 3px 10px;
  border-radius: 7px;
  font-weight: 500;
  color: ${(props) => (props.selected ? "black" : "white")};
  background-color: ${(props) => (props.selected ? "white" : "#292929")};
`;

const ButtonWrapper = styled.div`
  /* background-color: green; */
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const VideosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 15px;
  padding: 10px;
  margin-top: 60px;
`;

export default LandingPage;
