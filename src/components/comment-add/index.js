import React, { useState, useEffect } from "react";
import { addComment } from "../../api/posts";
import { currentUser } from "../../service/user.service";
import { Link, withRouter } from "react-router-dom";
// import "./comment-add.css";

const NewComment = (props) => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState(undefined);
	const [postId, setPostId] = useState(undefined);
	const [needToLogin, setNeedToLogin] = useState(false);

	const initialSetup = () => {
		setPostId(props.postId);
		if (!currentUser._id) {
			setNeedToLogin(true);
		}
		console.log("newcomment ", props, currentUser);
	};

	useEffect(initialSetup, [currentUser]);

	const handleClick = () => {
		var payload = {
			userId: currentUser._id,
			username: currentUser.username,
			postId: postId,
			message: message,
		};
		console.log("payload", payload);

		addComment(payload)
			.then((response) => {
				if (response.status === 200) {
					// link to thread page
					const data = response.data;
					// convert to post object
					const post = {
						userId: data._id,
						message: data.message,
						created: data.created,
						user: [
							{
								name: currentUser.name,
								id: currentUser.id,
							},
						],
					};
					props.success(post);

					// clear data
					setMessage("");
					setLocation(undefined);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	if (needToLogin) {
		return (
			<div id={props.id} className="new-post">
				Please sign-in/sign-up to add a post.
				<Link
					to={{
						pathname: "/login",
						state: { from: props.location },
					}}
				>
					<p className="button">Go to sign-in/sign-up</p>
				</Link>
			</div>
		);
	} else {
		return (
			<div id={props.id} className="new-comment">
				<h2>Add post:</h2>
				<textarea
					id="comment"
					alt="comment"
					name="comment"
					aria-label="New comment"
					onChange={(event) => setMessage(event.target.value)}
				></textarea>
				<button aria-label="Add comment to thread" onClick={handleClick}>
					Submit
				</button>
				<div>{error ? error : ""}</div>
			</div>
		);
	}
};

export default withRouter(NewComment);
