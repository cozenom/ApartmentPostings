import React from "react";
import "./comments.css";
import { convertDate } from "../../service/helper";

const Comments = (props) => {
	console.log(props.comment);
	return (
		<div className="comment-item">
			<div className="date">{convertDate(props.comment.created)}</div>
			<div className="comment">{props.comment.message}</div>
		</div>
	);
};

export default Comments;
