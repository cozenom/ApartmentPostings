import React from "react";
// import "./header.css";
import { Link, withRouter } from "react-router-dom";
import { currentUser, logOut } from "../../service/user.service";

const Header = (props) => {
	// console.log("Props: ", props);
	// console.log("Currentuser: ", currentUser, currentUser.id);
	return (
		<header role="banner" className="active" id="scroll-header">
			<nav role="navigation" className="menu">
				<Link aria-label="Navigate to Home page" to="/">
					Home
				</Link>
			</nav>
			<div className="login">
				{currentUser._id ? (
					<div>
						<div className="user">Hello {currentUser.username}</div>
						<button onClick={logOut} aria-label="Logout button">
							Logout
						</button>
					</div>
				) : (
					<Link
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					>
						Sign-In/Sign-up
					</Link>
				)}
			</div>
		</header>
	);
};

export default withRouter(Header);
