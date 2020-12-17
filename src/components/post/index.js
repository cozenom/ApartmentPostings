import React, { useEffect, useState } from "react";
import "./post.css";
import { convertDate } from "../../service/helper";
import { imageSize, getImageUrl } from "../../service/imageURLgenerator";
import { Link } from "react-router-dom";

const Post = (props) => {
  return (
    <Link
      className="post-container"
      to={{
        pathname: "/post/" + props.post._id,
        state: { postId: props.post._id, post: props.post },
      }}
    >
      <div className="content">
        <div className="title">{props.post.title}</div>
        <div className="left">
          <div className="date"> </div>
          <div className="price">Price: ${props.post.price}</div>
          <div className="bedrooms">BR: {props.post.bedrooms}</div>
          <div className="area">Area: {props.post.area} sqft</div>Posted:{" "}
          {convertDate(props.post.date)}
        </div>
      </div>
      <div className="right">
        <div
          className="image"
          style={{
            backgroundImage: `url(${getImageUrl(
              props.post.images[0],
              imageSize.M
            )})`,
          }}
        ></div>
      </div>
    </Link>
  );
};

export default Post;
