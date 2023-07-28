import React from "react";
import styled from "@emotion/styled";

function Comment(props) {
  if (props.comments) {
    return (
      <Container>
        {props.comments.map((comment) => (
          <ContainerWrapper>
            <WriterImage src={comment.writer.image} />

            <CommentContainer>
              <Writer>{comment.writer.nickname}</Writer>
              <Content>{comment.content}</Content>

              <ButtonContainer>
                <ReplyButton>답글</ReplyButton>
              </ButtonContainer>
            </CommentContainer>
          </ContainerWrapper>
        ))}
      </Container>
    );
  } else {
    return null;
  }
}

const Container = styled.div``;

const ContainerWrapper = styled.div`
  display: flex;
`;

const CommentContainer = styled.div`
  color: white;
  margin-left: 10px;
  margin-bottom: 20px;
`;
const WriterImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  vertical-align: top;
`;

const Writer = styled.span``;

const Content = styled.p``;

const ButtonContainer = styled.div``;

const ReplyButton = styled.button`
  background-color: transparent;
  font-size: 12px;
  font-weight: 600;
  border-radius: 15px;
  padding: 5px 10px;
  transform: translateX(-10px);

  &:hover {
    background-color: #494949;
  }
`;

export default Comment;
