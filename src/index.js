import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
// Route
// import AuthenticatedRoute from "./components/authenticated-route";

// Pages
import Feed from "./views/feed";
import NotFound from "./views/not-found";

// Components
import Header from "./components/header";
import Footer from "./components/footer";
import Sort from "./components/sort";
import Filter from "./components/filter";

// Services
import { getUser } from "./service/user.service";

// Load cached user
getUser();

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Header />
			<Filter />
			<Sort />
			<div role="main" id="craigslist-body" className="craigslist-body">
				<Switch>
					<Route exact path="/">
						<Feed />
					</Route>
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
