import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

function Comment(props) {
  const user = useSelector((state) => state.user);
  const videoId = props.videoId;
  const [CommentValue, setCommentValue] = useState("");
  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(videoId);
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: videoId,
    };
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        props.refreshFunction(response.data.result);
        setCommentValue("");
      } else {
        alert("댓글을 저장하지 못했습니다.");
      }
    });
  };

  useEffect(() => {
    console.log("test", props.CommentLists);
  }, []);
  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/* Comment List */}
      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <SingleComment
                refreshFunction={props.refreshFunction}
                key={index}
                comment={comment}
                postId={videoId}
              />
            )
        )}
      {/* Roote Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={CommentValue}
          placeholder="댓글을 작성해주세요"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
