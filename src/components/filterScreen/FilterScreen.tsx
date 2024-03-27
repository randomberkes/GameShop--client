import React, { useContext, useEffect, useState } from "react";
import "./filterScreen.css";
import FilterCard from "./filterCard/FilterCard.tsx";
import axios from "axios";
import { MyContext } from "../../Context.ts";

function FilterScreen() {
	const { categoryTypesContext } = useContext(MyContext);
	const { categoryTypes, setCategoryTypes } = categoryTypesContext;

	useEffect(() => {
		axios.get("/categoryTypes").then((response) => {
			const productListData = response.data.map((data) => {
				return {
					id: data.id,
					name: data.category_type_name,
				};
			});
			setCategoryTypes(productListData);
			console.log(categoryTypes);
		});
	}, []);

	const createFilterCard = (categoryType) => {
		return (
			<FilterCard key={categoryType.id} categoryType={categoryType.name} />
		);
	};

	return (
		<div className="row container-fluid justify-content-end filterScreen">
			{categoryTypes.map(createFilterCard)}
		</div>
	);
}

export default FilterScreen;
