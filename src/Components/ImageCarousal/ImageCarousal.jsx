import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { Col, Empty, Image, Row, Space } from "antd";
import { noimage } from "utils/constants";

const ImageCarousal = ({ images = [] }) => {
  // images.length = 2;
  const imagesList = images.map((i) => (
    <div style={{ height: "180px", width: "100%" }}>
      <Image
        alt={""}
        src={i ?? "error"}
        fallback={noimage}
        width="95%"
        style={{
          height: "170px",
          width: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  ));

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={i == images.length - 1 ? images[0] : images[i + 1]}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </a>
      );
    },
    dots: true,
    swipeToSlide: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: images.length > 3 ? 3 : images.length,
    slidesToScroll: 1,
  };
  if (images.length <= 0) {
    return (
      <Empty
        style={{ width: "100%" }}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="No Images"
      />
    );
  }
  if (images.length < 3) {
    return (
      <Row>
        {imagesList.map((i, j) => (
          <Col flex={"auto"} key={j}>
            {i}
          </Col>
        ))}
      </Row>
    );
  }
  return <Slider {...settings}>{imagesList}</Slider>;
};

export default ImageCarousal;
