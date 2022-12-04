import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">GIỚI THIỆU</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dlqpuvqjb/image/upload/v1667983473/avatars/xy89tmlfbz4lzxkscsh4.png"
              alt="Founder"
            />
            <Typography>Mai Văn Thinh</Typography>
            <Button onClick={visitInstagram} color="primary">
              Đi đến Instagram
            </Button>
            <span>
              Đây là một dự án wesbite được thực hiện bởi @Maivanthinh. Chỉ với
              mục đích tìm hiểu về Mern Stack
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Tài khoản MXH</Typography>
            <a href="https://www.youtube.com/" target="blank">
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
