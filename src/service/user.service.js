import { deleteCookie, getCookie, setCookie } from "./cookie.service";
const COOKIE_NAME = "user";

const addUser = (user) => {
  // console.log("Adding ", user);
  Object.assign(currentUser, user);
  setCookie(COOKIE_NAME, JSON.stringify(currentUser), 1);
};

const getUser = () => {
  if (!initialLoad) {
    let cookie = getCookie(COOKIE_NAME);
    if (cookie) {
      try {
        cookie = JSON.parse(cookie);
      } catch (error) {
        console.log("Failed to load cached user");
      }
      addUser(cookie);
    }
    initialLoad = true;
  }
  return currentUser;
};

const logOut = () => {
  Object.assign(currentUser);
  deleteCookie(COOKIE_NAME);
  window.location.href = "/";
};

let initialLoad = false;
const currentUser = {};

export { currentUser, addUser, getUser, logOut };
