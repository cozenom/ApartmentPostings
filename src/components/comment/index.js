import React from "react";
import "./comment.css";
import { convertDateToFromNow } from "../../service/helper";

const Comments = (props) => {
	console.log(props.comment);
	return (
		<span className="comment-item">
			<div className="comment">{props.comment.message}</div>
			<div className="date">
				Added: {convertDateToFromNow(props.comment.created)}
			</div>
		</span>
	);
};

export default Comments;
