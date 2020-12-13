import React, { useState, useEffect } from "react";
import "./filter.css";

const Filter = (props) => {
	const [min, setMin] = useState("0");
	const [max, setMax] = useState("999999");
	const [minbedrooms, setminBedrooms] = useState("0");
	const [minarea, setminArea] = useState("0");
	const [maxarea, setMaxArea] = useState("9999999");
	const [newFilter, setNewFilter] = useState({});
	const [oldFilter, setOldFilter] = useState({});

	useEffect(() => {
		setNewFilter({ min, max, minbedrooms, minarea, maxarea });
		if (oldFilter != newFilter) {
			setOldFilter(newFilter);
			return;
		} else {
			return;
		}
	}, [min, max, minbedrooms, minarea, maxarea]);

	return (
		<div className="filter">
			<div className="filter-container">
				<div className="price">
					$
					<input
						onChange={(event) => setMin(event.target.value)}
						min="0"
						type="number"
						value={min}
					/>{" "}
					- $
					<input
						onChange={(event) => setMax(event.target.value)}
						min="0"
						type="number"
						value={max}
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
