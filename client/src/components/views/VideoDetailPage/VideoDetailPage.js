import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineShareAlt,
  AiTwotoneLike,
  AiTwotoneDislike,
} from "react-icons/ai";
import { css } from "@emotion/react";
import SideVideos from "./Sections/SideVideos";
import CommentForm from "./Sections/CommentForm";
import Comment from "./Sections/Comment";
import { useSelector } from "react-redux";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VideoDetailPage() {
  const user = useSelector((state) => state.user);

  const params = useParams();
  const videoId = params.videoId;
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [videoDetail, setVideoDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [subscribed, setSubscribed] = useState(false);

  const videoRef = useRef(null);

  const onSubscribe = () => {
    let subscribedVariable = {
      userTo: videoDetail.writer._id,
      userFrom: user.userData._id,
    };

    // 이미 구독 중이라면
    if (subscribed) {
      axios.post("/api/subscribe/unSubscribe", subscribedVariable).then((response) => {
        if (response.data.success) {
          setSubscribeNumber(subscribeNumber - 1);
          setSubscribed(!subscribed);
        } else {
          toast.error("구독 취소 하는데 실패했습니다.", { autoClose: 1500 });
        }
      });
    } else {
      axios.post("/api/subscribe/subscribe", subscribedVariable).then((response) => {
        if (response.data.success) {
          setSubscribeNumber(subscribeNumber + 1);
          setSubscribed(!subscribed);
        } else {
          toast.error("구독 하는데 실패했습니다.", { autoClose: 1500 });
        }
      });
    }
  };

  const onLike = () => {
    const variable = {
      videoId: videoId,
      userId: user.userData._id,
    };

    if (isLiked) {
      axios.post("/api/like/unLike", variable).then((response) => {
        if (response.data.success) {
          setLike((like) => like - 1);
          setIsLiked(false);
        } else {
          toast.error("좋아요를 내리지 못했습니다.", { autoClose: 1500 });
        }
      });
      return;
    }
    if (!isLiked) {
      axios.post("/api/like/upLike", variable).then((response) => {
        if (response.data.success) {
          setLike((like) => like + 1);
          setIsLiked(true);

          if (isDisliked) {
            setDislike((dislike) => (dislike - 1 > 0 ? dislike - 1 : 0));
            setIsDisliked(false);
          }
        } else {
          toast.error("좋아요를 올리지 못했습니다.", { autoClose: 1500 });
        }
      });
      return;
    }
  };

  const onDisLike = () => {
    const variable = {
      videoId: videoId,
      userId: user.userData._id,
    };

    if (isDisliked) {
      axios.post("/api/like/unDislike", variable).then((response) => {
        if (response.data.success) {
          setDislike((dislike) => (dislike - 1 > 0 ? dislike - 1 : 0));
          setIsDisliked(false);
        } else {
          toast.error("싫어요를 내리지 못했습니다.", { autoClose: 1500 });
        }
      });
      return;
    }
    if (!isDisliked) {
      axios.post("/api/like/upDislike", variable).then((response) => {
        if (response.data.success) {
          console.log("success upDislike");
          setDislike((dislike) => dislike + 1);
          setIsDisliked(true);

          if (isLiked) {
            setLike((like) => (like - 1 > 0 ? like - 1 : 0));
            setIsLiked(false);
          }
        } else {
          toast.error("싫어요를 올리지 못했습니다.", { autoClose: 1500 });
        }
      });
      return;
    }
  };

  function onShare() {
    const webAddress = window.location.href;

    navigator.clipboard
      .writeText(webAddress)
      .then(() => {
        toast.success("주소를 성공적으로 복사했습니다.", { autoClose: 1500 });
      })
      .catch((err) => {
        toast.error("주소를 복사하는데 실패했습니다.", { autoClose: 1500 });
      });
  }

  useEffect(() => {
    let variable = { videoId: videoId };
    axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);

        const subscribedVariable = {
          userTo: response.data.videoDetail.writer._id, // ?????
          userFrom: user.userData._id,
        };

        axios.post("/api/subscribe/subscribed", subscribedVariable).then((response) => {
          if (response.data.success) {
            setSubscribed(response.data.subscribed);
          } else {
            toast.error("구독 여부 정보를 받아오지 못했습니다.", { autoClose: 1500 });
          }
        });

        variable = { userTo: response.data.videoDetail.writer._id };
        axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
          if (response.data.success) {
            console.log(response.data.subscribeNumber);
            setSubscribeNumber(response.data.subscribeNumber);
          } else {
            toast.error("구독자 수 정보를 받아오지 못했습니다.", { autoClose: 1500 });
          }
        });
      } else {
        toast.error("비디오 정보를 가져오길 실패했습니다.", { autoClose: 1500 });
      }
    });

    axios.post("/api/comment/getComments", variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
        console.log("getComments ", response.data.comments);
      } else {
        toast.error("댓글 정보를 가져오는 것을 실패했습니다.", { autoClose: 1500 });
      }
    });

    axios.post("/api/like/getLikes", { videoId: videoId }).then((response) => {
      console.log("좋아요", response.data);
      setLike(response.data.likes.length);

      response.data.likes.map((like) => {
        if (like.userId === user.userData._id) {
          setIsLiked(true);
        }
      });
    });

    axios.post("/api/like/getDislikes", { videoId: videoId }).then((response) => {
      console.log("싫어요", response.data.dislikes);
      setDislike(response.data.dislikes.length);
      response.data.dislikes.map((dislike) => {
        if (dislike.userId === user.userData._id) {
          setIsDisliked(true);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      console.log(videoRef);
      const video = videoRef.current;
      const checkVideoTime = () => {
        if (video.currentTime >= 5) {
          console.log("The video has been watched for 5 seconds or more.");

          axios
            .post("/api/video/increaseVideoView", { videoId: videoId })
            .then((response) => {
              if (response.data.success) {
                console.log("조회수를 성공적으로 올렸습니다.");
              } else {
                console.log("조회수를 올리는데 실패했습니다.");
              }
            });
          video.removeEventListener("timeupdate", checkVideoTime);
        }
      };

      video.addEventListener("timeupdate", checkVideoTime);

      return () => video.removeEventListener("timeupdate", checkVideoTime);
    }
  }, [videoDetail.writer, videoRef]);

  return (
    <>
      {videoDetail.writer && (
        <Container>
          <LeftContent>
            <VideoWrapper>
              <Video
                ref={videoRef}
                src={`http://localhost:9999/${videoDetail.filePath}`}
                controls
                autoPlay
              />
            </VideoWrapper>
            <VideoTitle>{videoDetail.title}</VideoTitle>
            <WriterMetaContainer>
              <WriterIcon src={videoDetail.writer.image} />

              <WriterNameSubscribeContainer>
                <WriterName>{videoDetail.writer.name}</WriterName>
                <Subscriber>구독자 {subscribeNumber}명</Subscriber>
              </WriterNameSubscribeContainer>

              <ButtonContainer>
                <LeftButtonContainer>
                  {videoDetail.writer._id !== user.userData._id && (
                    <SubscribeButton subscribed={subscribed} onClick={onSubscribe}>
                      {subscribed ? "구독중" : "구독"}
                    </SubscribeButton>
                  )}
                </LeftButtonContainer>
                <RightButtonContainer>
                  <ButtonContainer>
                    <Like onClick={onLike} isLiked={isLiked}>
                      {isLiked ? <LikeActiveIcon /> : <LikeIcon />}

                      {like}
                    </Like>
                    <Dislike onClick={onDisLike} isDisliked={isDisliked}>
                      {isDisliked ? <DisLikeActiveIcon /> : <DislikeIcon />}

                      {dislike}
                    </Dislike>
                  </ButtonContainer>

                  <Share onClick={onShare}>
                    <ShareIcon />
                    공유
                  </Share>
                </RightButtonContainer>
              </ButtonContainer>
            </WriterMetaContainer>

            <DescriptionContainer>
              <ViewCount>조회수 {videoDetail.view}회</ViewCount>
              <Description>{videoDetail.description}</Description>
            </DescriptionContainer>

            <CommentContainer>
              <CommentHeader>
                <CommentNumber>댓글 {comments.length}개</CommentNumber>
              </CommentHeader>

              {user.userData.isAuth && (
                <CommentForm user={user} videoId={videoId} setComments={setComments} />
              )}
              <Comment comments={comments} />
            </CommentContainer>
          </LeftContent>
          <RightContent>
            <SideVideos />
          </RightContent>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  height: calc(100vh - 56px);
  margin-left: 64px;
  background-color: #111111;
  padding: 0px 35px;
  overflow: auto;
  display: flex;
`;

const LeftContent = styled.div`
  flex: 3;
  max-width: 75%;
`;

const VideoWrapper = styled.div`
  box-shadow: 0 30px 40px -20px rgba(255, 255, 255, 0.1);
`;

const Video = styled.video`
  width: 100%;
  height: 80%;
`;

const VideoMetaContainer = styled.div``;

const VideoTitle = styled.h1`
  color: white;
  font-size: 22px;
  padding: 10px 0;
`;

const WriterMetaContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const WriterIcon = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
`;

const WriterNameSubscribeContainer = styled.div``;

const WriterName = styled.span`
  color: white;
  display: block;
  font-weight: bold;
`;

const Subscriber = styled.span`
  color: #a9a9a9;
  white-space: nowrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 15px;
  color: white;
`;

const Button = styled.button`
  height: 95%;
  padding: 0 20px;
  background-color: transparent;
  border: 1px solid #717171;
  border-radius: 20px;
  white-space: nowrap;

  &:hover {
    background-color: #a0a0a0;
  }
`;

const LeftButtonContainer = styled.div``;

const SubscribeButton = styled(Button)`
  color: ${(props) => (props.subscribed ? "white" : "black")};
  background-color: ${(props) => (props.subscribed ? "transparent" : "white")};
`;

const RightButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const IconStyle = css`
  font-size: 20px;
  vertical-align: top;
  margin-right: 10px;
`;

const LikeActiveIcon = styled(AiTwotoneLike)`
  ${IconStyle}
`;

const LikeIcon = styled(AiOutlineLike)`
  ${IconStyle}
`;

const DisLikeActiveIcon = styled(AiTwotoneDislike)`
  ${IconStyle}
`;

const DislikeIcon = styled(AiOutlineDislike)`
  ${IconStyle}
`;

const Like = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;
const Dislike = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const ShareIcon = styled(AiOutlineShareAlt)`
  ${IconStyle}
`;

const Share = styled(Button)``;

const DescriptionContainer = styled.div`
  color: white;
  font-weight: 700;
  background-color: red;
  border-radius: 10px;
  padding: 10px;
  background-color: #292929;
  background-blend-mode: multiply, multiply;
  margin-bottom: 10px;
`;

const ViewCount = styled.span``;

const Description = styled.p``;

const CommentContainer = styled.div``;

const CommentHeader = styled.div`
  color: white;
  margin-bottom: 10px;
`;

const CommentNumber = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const RightContent = styled.div`
  flex: 1;
  padding: 0 30px;
`;

export default VideoDetailPage;
