import React, { useState, useEffect } from "react";
import "./sort.css";

const Sort = (props) => {
	const [sortBy, setSortBy] = useState("date");
	const [oldsortBy, setoldSortBy] = useState("date");

	useEffect(() => {
		setoldSortBy(sortBy);
		console.log("New = ", sortBy, "Old = ", oldsortBy);
		if (oldsortBy != sortBy) {
			setSortBy(sortBy);
			return;
		} else {
			return;
		}
	}, [sortBy]);

	return (
		<div className="sort">
			<div className="sort-by">
				<span>Sort by</span>
				<select
					value={sortBy}
					onChange={(event) => setSortBy(event.target.value)}
				>
					<option value="date">newest</option>
					<option value="priceasc">price↑</option>
					<option value="pricedesc">price↓</option>
				</select>
			</div>
		</div>
	);
};

export default Sort;
