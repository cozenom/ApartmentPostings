import React, { useState, useEffect } from "react";
import "./filter.css";

const Filter = (props) => {
	const [minPrice, setMinPrice] = useState("0");
	const [maxPrice, setMaxPrice] = useState("999999");
	const [minbedrooms, setminBedrooms] = useState("0");
	const [minarea, setminArea] = useState("0");
	const [maxarea, setMaxArea] = useState("999999");
	const [newFilter, setNewFilter] = useState({});

	useEffect(() => {
		const currentFilter = {
			minPrice,
			maxPrice,
			minbedrooms,
			minarea,
			maxarea,
		};
		if (currentFilter != newFilter) {
			// console.log("New  ", currentFilter, "Old ", newFilter);
			setNewFilter(currentFilter);
			props.updateFilter(currentFilter);
			return;
		} else {
			return;
		}
	}, [minPrice, maxPrice, minbedrooms, minarea, maxarea]);

	return (
		<div className="filter">
			<div className="filter-container">
				<span>
					<input
						onChange={(event) => setMinPrice(event.target.value)}
						min="0"
						type="number"
						value={minPrice}
					/>
					{"  "}$ -
					<input
						onChange={(event) => setMaxPrice(event.target.value)}
						min="0"
						type="number"
						value={maxPrice}
					/>
					{"  "}${"  "}
				</span>
				<span>
					<input
						onChange={(event) => setminBedrooms(event.target.value)}
						min="0"
						type="number"
						value={minbedrooms}
					/>
					{"  "}
					BR{"  "}
				</span>
				<span>
					<input
						onChange={(event) => setminArea(event.target.value)}
						min="0"
						type="number"
						value={minarea}
					/>
					{"  "}
					sqft -{"  "}
					<input
						onChange={(event) => setMaxArea(event.target.value)}
						min="0"
						type="number"
						value={maxarea}
					/>
					{"  "}
					sqft
				</span>
			</div>
		</div>
	);
};

export default Filter;
