import Header from "../../components/header";
import React, { useState, useEffect } from "react";
import { login, logout } from "../../api/user";
// import { getUser } from "../../service/user.service";

const HeaderView = () => {
	const [user, setUser] = useState(null);
	const getUser = () => {
		login()
			.then((response) => {
				if (response.data) {
					setUser(response.data);
				}
			})
			.catch((err) => {
				console.log("Request to login failed", err);
			});
	};

	const loginSuccess = (data) => {
		setUser(data);
	};

	const logoutUser = () => {
		logout()
			.then((response) => {
				if (response.data && response.data === true) {
					setUser(null);
					// remove cookie
					deleteCookie("connect.sid");
				}
			})
			.catch((err) => {
				console.log("Request to logout failed", err);
			});
	};

	useEffect(getUser, []);
	return <Header logout={logoutUser} user={user} />;
};
export default HeaderView;
