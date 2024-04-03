import React, { useContext, useEffect } from "react";
import "./filterScreen.css";
import FilterCard from "./filterCard/FilterCard.tsx";
import { CategoryTypeContext } from "../../../Context.ts";
import categoryTypesApi from "../../../api/categoryTypesApi.ts";
import productsApi from "../../../api/productsApi.ts";
import { Filter } from "../../../DTO/filter.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import { setProducts } from "../../../Redux/productsSlice.ts";
import { setCategoryTypes } from "../../../Redux/categoryTypesSlice.ts";
function FilterScreen() {
	const { categoryTypes } = useSelector(
		(state: RootState) => state.categoryTypes
	);

	const dispatch = useDispatch();

	const filter: Filter = {};

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
				// getFilter={getFilter}
			/>
		);
	};

	return (
		<div className="row container-fluid justify-content-end filterScreen">
			{categoryTypes
				.filter((categoryType) => {
					return categoryType.name != "Platform";
				})
				.map(createFilterCard)}
		</div>
	);
}

export default React.memo(FilterScreen);
