import React, { useContext, useEffect, useState } from "react";
import "./filterScreen.css";
import FilterCard from "./filterCard/FilterCard.tsx";
import { MyContext } from "../../Context.ts";
import categoryTypesApi from "../../api/categoryTypesApi.ts";

function FilterScreen() {
	const { categoryTypesContext } = useContext(MyContext);
	const { categoryTypes, setCategoryTypes } = categoryTypesContext;

	useEffect(() => {
		// axios.get("http://127.0.0.1:5000/categoryTypes").then((response) => {
		// 	const productListData = response.data.map((data) => {
		// 		return {
		// 			id: data.id,
		// 			name: data.category_type_name,
		// 		};
		// 	});
		// 	setCategoryTypes(productListData);
		// 	console.log(categoryTypes);
		// });
		getAllCategoryTypes();
	}, []);

	const getAllCategoryTypes = async () => {
		const categoriesListData = await categoryTypesApi.getAllCategoryTypes();
		setCategoryTypes(categoriesListData);
	};

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
