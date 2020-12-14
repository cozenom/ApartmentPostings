import axios from "axios";
import env from "../config/env";

export const getPosts = (filter, sort, page) => {
	const uriFilter = encodeURIComponent(JSON.stringify(filter));
	console.log(uriFilter);
	const uriSort = encodeURIComponent(sort);
	// console.log(uriSort);
	return axios.get(
		`${
			env[process.env.NODE_ENV].api
		}/posts/all?page=${page}&filter=${uriFilter}&sort=${uriSort}`
	);
};

export const searchAllPosts = (searchTerm) => {
	return axios.get(
		env[process.env.NODE_ENV].api + "/posts/search?searchTerm=" + searchTerm
	);
};

export const getPost = (id) => {
	return axios.get(env[process.env.NODE_ENV].api + "/posts/one?id=" + id);
};
