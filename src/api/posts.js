import axios from "axios";
import env from "../config/env";

export const getPosts = (filter, sort, page) => {
  const uriFilter = encodeURIComponent(JSON.stringify(filter));
  const uriSort = encodeURIComponent(sort);
  return axios.get(
    `${
      env[process.env.NODE_ENV].api
    }/posts/all?page=${page}&filter=${uriFilter}&sort=${uriSort}`
  );
};

export const getPost = (id) => {
  return axios.get(env[process.env.NODE_ENV].api + "/posts/one?id=" + id);
};

export const addComment = (payload) => {
  return axios.post(env[process.env.NODE_ENV].api + "/comments/add", payload, {
    withCredentials: true,
    timeout: 10000,
  });
};

export const getComments = (postId, userId) => {
  return axios.get(
    env[process.env.NODE_ENV].api + `/comments/all?id=${postId}&user=${userId}`,
    {
      withCredentials: true,
      timeout: 10000,
    }
  );
};
