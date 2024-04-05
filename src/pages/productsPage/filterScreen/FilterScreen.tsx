import React, { useEffect } from "react";
import "./filterScreen.css";
import FilterCard from "./filterCard/FilterCard.tsx";
import categoryTypesApi from "../../../api/categoryTypesApi.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import { setCategoryTypes } from "../../../Redux/categoryTypesSlice.ts";
function FilterScreen() {
	const { categoryTypes } = useSelector(
		(state: RootState) => state.categoryTypes
	);

	const dispatch = useDispatch();

	useEffect(() => {
		getAllCategoryTypes();
	}, []);

	const getAllCategoryTypes = async () => {
		const categoriesListData = await categoryTypesApi.getAllCategoryTypes();
		dispatch(setCategoryTypes(categoriesListData));
	};

	const createFilterCard = (categoryType, index) => {
		return (
			<FilterCard
				key={index}
				categoryType={categoryType.name}
				filterCardId={index}
			/>
		);
	};

	return (
		<div className="filterScreenContainer">
			{categoryTypes
				.filter((categoryType) => {
					return categoryType.name !== "Platform";
				})
				.map(createFilterCard)}
		</div>
	);
}

export default React.memo(FilterScreen);
