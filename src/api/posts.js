import axios from "axios";
import env from "../config/env";

export const getPosts = (filter, sorting, page) => {
	const uriFilter = encodeURIComponent(JSON.stringify(filter));
	const uriSorting = encodeURIComponent(JSON.stringify(sorting));
	return axios.get(
		`${
			env[process.env.NODE_ENV].api
		}/posts/all?page=${page}&filter=${uriFilter}&sort=${uriSorting}`
	);
	// console.log(`${env[process.env.NODE_ENV].api}/posts/all/`);
	// return axios.get(`${env[process.env.NODE_ENV].api}/posts/all/`);
};

export const searchAllPosts = (searchTerm) => {
	return axios.get(
		env[process.env.NODE_ENV].api + "/posts/search?searchTerm=" + searchTerm
	);
};

export const getPost = (id) => {
	return axios.get(env[process.env.NODE_ENV].api + "/posts/one?id=" + id);
};
