import axios from "axios";
import env from "../config/env";

export const getPosts = (page) => {
	return axios.get(`${env[process.env.NODE_ENV].api}/posts/all?page=${page}`);
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
