import React, { useEffect, useState } from "react";
import "./post.css";
import { getPost } from "../../api/posts";
import Loader from "react-loader-spinner";
import { convertDate } from "../../service/helper";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { imageSize, getImageUrl } from "../../service/imageURLgenerator";

const Post = (props) => {
	const [id, setId] = useState();
	const [post, setPost] = useState(undefined);
	const [dataAvailable, setDataAvailable] = useState(false);
	const [pics, setPics] = useState(null);

	// console.log("Views/post/props", props.match.params.postId);

	const initialLoad = () => {
		if (props.location && props.location.state && props.location.state.postId) {
			setId(props.location.state.postId);
		} else if (props.match && props.match.params && props.match.params.postId) {
			setId(props.match.params.postId);
		} else {
			setRedirectToHome(true);
		}
		fetchPost;
	};

	useEffect(initialLoad, [props.location, props.match]);

	const fetchPost = () => {
		// console.log("fetchposts: ", filter, sort, currentPage);
		if (id && !post) {
			getPost(id)
				.then((response) => {
					setPost(response.data);
					setDataAvailable(true);
				})
				.catch((err) => {
					// Show error message
					console.error("Failed to get all posts", err);
				});
		}
	};

	useEffect(fetchPost, [id, post]);

	const getPics = () => {
		if (post && post.images) {
			setPics(
				post.images.map((id) => ({
					original: `${getImageUrl(id, imageSize.L)}`,
					thumbnail: `${getImageUrl(id, imageSize.S)}`,
				}))
			);
		} else {
			// setRedirectToHome(true);
		}
	};
	useEffect(getPics, [post]);

	return (
		<div className="post">
			<div className="container">
				{dataAvailable ? (
					<div className="post">
						<div className="content">
							<div className="title">{post.title}</div>
							<div>
								<ImageGallery
									items={pics}
									showPlayButton={false}
									showFullscreenButton={false}
									showIndex={true}
								/>
								<div className="extra">
									<div className="date">
										Date Posted: {convertDate(post.date)}
									</div>
									<div className="price">Price: ${post.price}</div>
									<div className="bedrooms">BR: {post.bedrooms}</div>
									<div className="area">Area: {post.area} sqft</div>
									<div className="address">Address: {post.mapaddress}</div>
								</div>
								<div className="neighborhood">
									Areas: {post.neighborhood.join(", ")}
								</div>
								<div className="body">{post.body}</div>
							</div>
						</div>{" "}
					</div>
				) : (
					<Loader
						type="Puff"
						color="#4f5d75"
						height={100}
						width={100}
						className="loader"
					/>
				)}
			</div>
		</div>
	);
};

export default Post;
