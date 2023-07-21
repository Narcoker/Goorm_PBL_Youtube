import { Row, Typography, Card, Col, Avatar } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    Axios.get("/api/video/getvideos").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideo(response.data.videos);
      } else {
        alert("비디오 가져오기를 실패했습니다.");
      }
    });
  }, []);

  const renderCards = Video.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    return (
      /* 가장 작을 때는 24, 중간 사이즈일때는 8 -> 한줄에 3개, 가장 클때는 6 -> 한줄에 4개*/
      <Col lo={6} md={8} xs={24}>
        <a href={`/video/post/${video.id}`}>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:9999/${video.thumbnail}`}
              alt="thumbnail"
            />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description={video.description}
        />
        <span>{video.writer.name}</span> <br />
        <span style={{ marginLeft: "3rem" }}> {video.views} views</span> -{" "}
        <span>{moment(video.createdAt).format("MM-dd-YYYY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Recomended</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default LandingPage;
