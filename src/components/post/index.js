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
				pathname: "/post/one?id" + props.post._id,
				state: { postId: props.post._id, post: props.post },
			}}
		>
			<div
				className="image"
				style={{
					backgroundImage: `url(${getImageUrl(
						props.post.images[0],
						imageSize.M
					)})`,
				}}
			></div>
			<div className="content">
				<div className="title">{props.post.title}</div>
				<div className="extra">
					<div className="date">
						Date Posted: {convertDate(props.post.date)}
					</div>
					<div className="price">Price: ${props.post.price}</div>
					<div className="bedrooms">BR: {props.post.bedrooms}</div>
					<div className="area">Area: {props.post.area} sqft</div>
					<div className="address">Address: {props.post.mapaddress}</div>
				</div>
				<div className="neighborhood">
					Areas: {props.post.neighborhood.join(", ")}
				</div>
			</div>
			{/* <div className="body">{props.post.body}</div> */}
		</Link>
	);
};

export default Post;
