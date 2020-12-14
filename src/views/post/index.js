import React, { useEffect, useState } from "react";
import "./post.css";
import { getPost } from "../../api/posts";
import Loader from "react-loader-spinner";
import SinglePost from "../../components/single-post";

const Post = (props) => {
	const [id, setId] = useState();
	const [post, setPost] = useState(undefined);
	const [dataAvailable, setDataAvailable] = useState(false);
	console.log("Views/post/props", props.match.params.postId);

	const initialLoad = () => {
		if (props.location && props.location.state && props.location.state.postId) {
			setId(props.location.state.postId);
			console.log("Updated id");
		} else if (props.match && props.match.params && props.match.params.postId) {
			setId(props.match.params.postId);
			console.log("Updated id", id, props.match.params.postId);
		} else {
			setRedirectToHome(true);
		}
	};
	useEffect(initialLoad, [props.location, props.match]);

	const fetchPost = () => {
		// console.log("fetchposts: ", filter, sort, currentPage);
		if (id && !post) {
			console.log("id", id);

			getPost(id)
				.then((response) => {
					console.log("Fetchpost ", response);
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

	return (
		<div className="post">
			<div className="container">
				{
					// Show loader until we load the user list
					dataAvailable ? (
						<SinglePost post={post} />
					) : (
						<Loader
							type="Puff"
							color="#4f5d75"
							height={100}
							width={100}
							className="loader"
						/>
					)
				}
			</div>
		</div>
	);
};

export default Post;
