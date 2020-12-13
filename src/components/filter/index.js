import React, { useState, useEffect } from "react";
import "./filter.css";

const Filter = (props) => {
	const [minPrice, setMinPrice] = useState("0");
	const [maxPrice, setMaxPrice] = useState("999999");
	const [minbedrooms, setminBedrooms] = useState("0");
	const [minarea, setminArea] = useState("0");
	const [maxarea, setMaxArea] = useState("999999");
	const [newFilter, setNewFilter] = useState({});
	const [oldFilter, setOldFilter] = useState({});

	useEffect(() => {
		setNewFilter({
			min: minPrice,
			max: maxPrice,
			minbedrooms,
			minarea,
			maxarea,
		});
		if (oldFilter != newFilter) {
			setOldFilter(newFilter);
			return;
		} else {
			return;
		}
	}, [minPrice, maxPrice, minbedrooms, minarea, maxarea]);

	return (
		<div className="filter">
			<div className="filter-container">
				<div className="price">
					$
					<input
						onChange={(event) => setMinPrice(event.target.value)}
						min="0"
						type="number"
						value={minPrice}
					/>{" "}
					- $
					<input
						onChange={(event) => setMaxPrice(event.target.value)}
						min="0"
						type="number"
						value={maxPrice}
					/>
				</div>
				<div className="bedrooms">
					<input
						onChange={(event) => setminBedrooms(event.target.value)}
						min="0"
						type="number"
						value={minbedrooms}
					/>{" "}
					<span>BR</span>
				</div>
				<div className="area">
					{" "}
					<input
						onChange={(event) => setminArea(event.target.value)}
						min="0"
						type="number"
						value={minarea}
					/>
					sqft -
					<input
						onChange={(event) => setMaxArea(event.target.value)}
						min="0"
						type="number"
						value={maxarea}
					/>
					sqft
				</div>
			</div>
		</div>
	);
};

export default Filter;
