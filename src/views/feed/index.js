import React, { useEffect, useState } from "react";
import "./feed.css";
import { getPosts } from "../../api/posts";
import PostList from "../../components/post-list";
import Loader from "react-loader-spinner";
// import SearchBar from "../../components/search-bar";
import ReactPaginate from "react-paginate";
import Filter from "../../components/filter";
import Sort from "../../components/sort";

const Feed = (props) => {
	const [posts, setPosts] = useState([]);
	const [nrofPosts, setnrofPosts] = useState(0);
	const [dataAvailable, setDataAvailable] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [filter, setFilter] = useState({});
	const [sort, setSort] = useState({});

	const PER_PAGE = 10;

	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}

	const initialLoad = () => {
		setDataAvailable(false);
		fetchPosts;
		setDataAvailable(true);
		setCurrentPage(0);
	};

	const fetchPosts = () => {
		// console.log("fetchposts: ", filter, sort, currentPage);
		getPosts(filter, sort, currentPage)
			.then((response) => {
				// Insert users
				setPosts(response.data.Data);
				setnrofPosts(response.data.Count);

				// Let UI know that the users are available
			})
			.catch((err) => {
				// Show error message
				console.error("Failed to get all posts", err);
			});
	};

	useEffect(fetchPosts, [filter, sort, currentPage]);
	useEffect(initialLoad, [fetchPosts]);
	useEffect(() => {
		setCurrentPage(0);
	}, [filter, sort]);

	return (
		<div className="feed">
			<Filter updateFilter={setFilter} />
			<Sort updateSort={setSort} />
			<div className="container">
				{
					// Show loader until we load the user list
					dataAvailable ? (
						<React.Fragment>
							<ReactPaginate
								previousLabel={"← Previous"}
								nextLabel={"Next →"}
								pageCount={Math.ceil(nrofPosts / PER_PAGE)}
								onPageChange={handlePageClick}
								containerClassName={"pagination"}
								previousLinkClassName={"pagination__link"}
								nextLinkClassName={"pagination__link"}
								disabledClassName={"pagination__link--disabled"}
								activeClassName={"pagination__link--active"}
							/>
							<PostList posts={posts} />
						</React.Fragment>
					) : (
						<Loader
							type="Puff"
							color="#4f5d75"
							height={100}
							width={100}
							className="loader"
						/>
					)
				}
			</div>
		</div>
	);
};

export default Feed;
