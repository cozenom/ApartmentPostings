import React from "react";
import Comment from "../comment";

function CommentList(props) {
	console.log("commentlist", props);
	const comments = props.comments;
	const listItems = comments.map((comment, index) => (
		<Comment key={comment._id || index} comment={comment} />
	));
	return <div className="comment-list">{listItems}</div>;
}

export default CommentList;
