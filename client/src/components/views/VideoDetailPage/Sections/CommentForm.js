import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import axios from "axios";

function CommentForm(props) {
  const [newComment, setNewComment] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const inputHandler = () => {
    setIsFocus(true);
  };

  const cancelHandler = () => {
    setIsFocus(false);
    setNewComment("");
  };

  const newCommentHandler = (e) => {
    setNewComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: newComment,
      writer: props.user.userData._id,
      postId: props.videoId,
    };

    console.log(variables);

    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setNewComment("");

        const variable = { videoId: props.videoId };
        axios.post("/api/comment/getComments", variable).then((response) => {
          if (response.data.success) {
            props.setComments(response.data.comments);
            console.log("getComments ", response.data.comments);
          } else {
            alert("댓글 정보를 가져오는 것을 실패했습니다.");
          }
        });
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  return (
    <Container>
      <UserImage src={props.user.userData.image} />

      <WriteContainer>
        <CommentInputWrapper $isFocus={isFocus}>
          <CommentInput
            placeholder="댓글 추가..."
            onFocus={inputHandler}
            onChange={(e) => newCommentHandler(e)}
            value={newComment}
          />
        </CommentInputWrapper>
        <CommentInputBottomContainer $isFocus={isFocus}>
          <CancelButton onClick={cancelHandler}>취소</CancelButton>
          <SubmitButton onClick={(e) => onSubmit(e)} disabled={!newComment}>
            댓글
          </SubmitButton>
        </CommentInputBottomContainer>
      </WriteContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const UserImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const WriteContainer = styled.div`
  width: 100%;
  padding-left: 10px;
`;

const CommentInputWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #717171;
  margin-bottom: 10px;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
    width: 100%;
    height: 1px;
    background-color: white;
    bottom: 0;
    transition: transform 0.3s;
  }

  ${(props) =>
    props.$isFocus &&
    css`
      &::before {
        transform: translateX(-50%) scaleX(1);
      }
    `}
`;

const CommentInput = styled.input`
  width: 100%;
  height: calc(1em + 2px);
  background-color: transparent;
  border: none;
  padding: 2px 0;
  color: white;
  outline: none;
  overflow: auto;
`;

const CommentInputBottomContainer = styled.div`
  display: flex;
  justify-content: end;
  display: ${(props) => (props.$isFocus ? "flex" : "none")};
  gap: 10px;
`;

const Button = styled.button`
  height: 95%;
  padding: 0 20px;
  background-color: transparent;
  border-radius: 20px;
  white-space: nowrap;
  padding: 10px 15px;
  color: white;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "initial" : "pointer")};
`;

const CancelButton = styled(Button)`
  &:hover {
    background-color: #292929;
  }
`;

const SubmitButton = styled(Button)`
  color: ${(props) => (props.disabled ? "rgba(255, 255, 255, 0.4)" : "white")};

  background-color: ${(props) => (props.disabled ? "#292929" : "#64B8FF")};
`;

export default CommentForm;
