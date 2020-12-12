import React, { useEffect, useState } from "react";
import "./feed.css";
import { getPosts } from "../../api/posts";
import PostList from "../../components/post-list";
import Loader from "react-loader-spinner";
// import { Link } from "react-router-dom";
// import SearchBar from "../../components/search-bar";
import ReactPaginate from "react-paginate";

const Feed = (props) => {
	const [posts, setPosts] = useState([]);
	const [nrofPosts, setnrofPosts] = useState(0);
	const [dataAvailable, setDataAvailable] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);

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
	}, []);
	// }, [filter, sorting]);

	useEffect(() => {
		setDataAvailable(false);
		getPosts(currentPage)
			.then((response) => {
				// Insert users
				setPosts(response.data);
				setnrofPosts(response.data.length);
				// Let UI know that the users are available
				setDataAvailable(true);
			})
			.catch((err) => {
				// TODO: Show error message
				console.error("Failed to get all posts", err);
			});
	}, []);

	const initialLoad = () => {
		getPosts();
		setCurrentPage(0);
	};
	useEffect(initialLoad, []);

	return (
		<div className="feed">
			<div className="title" title="Home" />

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
