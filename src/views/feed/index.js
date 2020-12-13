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
	const [currentPage, setCurrentPage] = useState(1);
	const [filter, setFilter] = useState({});
	const [sort, setSort] = useState({});

	// const [searchPosts, setSearchPosts] = useState([]);
	// const [searchDone, setSearchDone] = useState(false);
	// const [searchTerm, setSearchTerm] = useState("");

	const PER_PAGE = 10;

	// const triggerSearch = () => {
	// 	if (searchTerm !== "") {
	// 		onSearch(searchTerm);
	// 	} else {
	// 		setSearchThreads(threads);
	// 	}
	// };

	// useEffect(() => {
	// 	if (searchThreads.length > 0) {
	// 		// search list
	// 		const currentPageData = searchThreads.slice(offset, offset + PER_PAGE);
	// 		setVisibleThreads(currentPageData);
	// 	} else {
	// 		const currentPageData = threads.slice(offset, offset + PER_PAGE);
	// 		setVisibleThreads(currentPageData);
	// 	}
	// }, [threads, searchThreads, offset]);

	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}

	useEffect(() => {
		setCurrentPage(0);
	}, [filter, sort]);

	useEffect(getPosts, [filter, sort, currentPage]);

	const initialLoad = () => {
		setDataAvailable(false);
		getPosts(filter, sort, currentPage)
			.then((response) => {
				// Insert users
				setPosts(response.data.Data);
				setnrofPosts(response.data.Count);
				// Let UI know that the users are available
				setDataAvailable(true);
			})
			.catch((err) => {
				// Show error message
				console.error("Failed to get all posts", err);
			});
		setCurrentPage(0);
	};

	const fetchPosts = () => {
		getPosts(filter, sort, currentPage)
			.then((response) => {
				// Insert users
				setPosts(response.data.Data);
				setnrofPosts(response.data.Count);
				// Let UI know that the users are available
				setDataAvailable(true);
			})
			.catch((err) => {
				// Show error message
				console.error("Failed to get all posts", err);
			});
	};

	useEffect(initialLoad, []);
	useEffect(() => {
		setCurrentPage(0);
	}, [filter, sort]);
	useEffect(fetchPosts, [filter, sort, currentPage]);

	return (
		<div className="feed">
			<div className="title" title="Home" />
			<Filter updateFilter={setFilter} />
			<Sort updateSort={setSort} />
			<div className="container">
				{
					// Show loader until we load the user list
					dataAvailable ? (
						<React.Fragment>
							<PostList posts={posts} />
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
