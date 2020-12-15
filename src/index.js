import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import "./index.css";
import { getUser } from "./service/user.service";

// Pages
import Feed from "./views/feed";
import Post from "./views/post";
import NotFound from "./views/not-found";
import Authenticate from "./views/authenticate";

// Components
import Header from "./components/header";
import Footer from "./components/footer";

getUser();

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Header />
			<div role="main" id="craigslist-body" className="craigslist-body">
				<Switch>
					<Route exact path="/" component={Feed} />
					<Route path="/post/:postId" component={Post} />
					<Route path="/login" component={Authenticate} />
					<Route path="*" component={NotFound} />
				</Switch>
			</div>
			<Footer />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
reportWebVitals();
