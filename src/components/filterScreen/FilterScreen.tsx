import React, { useState } from "react";
import "./filterScreen.css";
import FilterCard from "./filterCard/FilterCard.tsx";

function FilterScreen() {
	return (
		<div className="row container-fluid justify-content-end filterScreen">
			<FilterCard />
			<FilterCard />
			<FilterCard />
		</div>
	);
}

export default FilterScreen;
