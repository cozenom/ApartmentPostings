import axios from "axios";
import env from "../config/env";

// Api call to get all users from the database
// mostly used for debugging and admin purposes
// Get env api -> production: deployed database
// development -> localhost database

export const signInUser = (payload) => {
	return axios.post(env[process.env.NODE_ENV].api + "/auth/signin", payload, {
		withCredentials: true,
		timeout: 10000,
	});
};

export const signUpUser = (payload) => {
	return axios.post(env[process.env.NODE_ENV].api + "/auth/signup", payload, {
		withCredentials: true,
		timeout: 10000,
	});
};

export const login = () => {
	return axios(env[process.env.NODE_ENV].api + "/auth/signin", {
		method: "get",
		withCredentials: true,
		timeout: 10000,
	});
};

export const logout = () => {
	return axios.post(env[process.env.NODE_ENV].api + "/auth/signout", {
		withCredentials: true,
		timeout: 10000,
	});
};
