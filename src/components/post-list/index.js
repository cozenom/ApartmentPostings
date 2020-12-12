import React from "react";
import Post from "../post";

function PostList(props) {
	const posts = props.posts;
	const listItems = posts.map((post, index) => (
		<Post key={post._id || index} post={post} />
	));
	return <div className="post-list">{listItems}</div>;
}

export default PostList;
