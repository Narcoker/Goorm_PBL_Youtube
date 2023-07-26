import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateOptions, CategoryOptions } from "../../Constants";

function VideoUploadPage() {
  const user = useSelector((state) => state.user);
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");
  const history = useHistory();

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };

  const onCatagoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    Axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);

        let variable = {
          url: response.data.url,
          fileame: response.data.fileName,
        };

        setFilePath(response.data.url);

        Axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration);
            setThumbnailPath(response.data.url);
          } else {
            alert("썸네일 생성에 실패했습니다.");
          }
        });
      } else {
        alert("비디오 업로드를 실패했습니디.");
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const variable = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };

    Axios.post("/api/video/uploadVideo", variable).then((response) => {
      if (response.data.success) {
        // message.success("성공적으로 업로드를 했습니다.");
        toast("성공적으로 업로드하였습니다!", { autoClose: 2200 });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      } else {
        alert("비디오 업로드에 실패 했습니다.");
      }
    });
  };

  return (
    <Container>
      <ToastContainer
        draggable={false}
        transition={Zoom}
        theme="dark"
        pauseOnFocusLoss={false}
      />

      <Header>
        <Title>동영상 업로드</Title>
      </Header>

      <Content onSubmit={onsubmit}>
        <InputItem>
          <UploadVideo>
            <VideoDropZoneWrapper onDrop={onDrop} multiple={false} maxSize={1000000000}>
              {({ getRootProps, getInputProps }) => (
                <VideoZone {...getRootProps()}>
                  <input {...getInputProps()} />
                  <PlusIcon>+</PlusIcon>
                </VideoZone>
              )}
            </VideoDropZoneWrapper>

            <VideoThumbnailWrapper>
              {ThumbnailPath ? (
                <VideoThumbnail
                  src={`http://localhost:9999/${ThumbnailPath}`}
                  alt="thumbnail"
                />
              ) : (
                <VideoThumbnailTemp></VideoThumbnailTemp>
              )}
            </VideoThumbnailWrapper>
          </UploadVideo>
        </InputItem>

        <InputItem>
          <Label>Title</Label>
          <Input onChange={onTitleChange} value={VideoTitle} />
        </InputItem>

        <InputItem>
          <Label>Description</Label>
          <TextArea onChange={onDescriptionChange} value={Description} />
        </InputItem>

        <InputItem>
          <Select onChange={onPrivateChange} value={Private}>
            {PrivateOptions.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>

          <Select onChange={onCatagoryChange} value={Category}>
            {CategoryOptions.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </InputItem>

        <SubmitContainer>
          <SubmitButton onClick={onSubmit}>업로드</SubmitButton>
        </SubmitContainer>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  background-color: #111111;
`;

//header
const Header = styled.div`
  margin-bottom: 20px;
`;
const Title = styled.h1`
  color: white;
`;

//content
const Content = styled.form``;

const UploadVideo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const VideoDropZoneWrapper = styled(Dropzone)``;
const VideoZone = styled.div`
  width: 300px;
  height: 240px;
  background-color: #292929;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  cursor: pointer;
`;
const PlusIcon = styled.span`
  color: white;
  font-size: 48px;
  font-weight: 100;
`;
const VideoThumbnailWrapper = styled.div``;
const VideoThumbnail = styled.img``;
const VideoThumbnailTemp = styled.div`
  width: 300px;
  height: 240px;
  background-color: #292929;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const InputItem = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: white;
  display: inline-block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  background-color: transparent;
  color: white;
  outline: none;
  border: none;
  border-bottom: 1px solid #a5a5a5;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  background-color: transparent;
  color: white;
  outline: none;
  border: 1px solid #a5a5a5;
  border-radius: 10px;
`;

const Select = styled.select`
  display: block;
  width: 140px;
  margin-bottom: 10px;
  padding: 2px;
  border-radius: 5px;
  background-color: transparent;
  color: white;
  cursor: pointer;
`;

const Option = styled.option``;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const SubmitButton = styled.button`
  padding: 5px 35px;
  color: white;
  border-radius: 5px;
  background-color: #40a9ff;
  transition: 0.3s;
  &:hover {
    background-color: white;
    color: #40a9ff;
  }
`;

export default VideoUploadPage;
