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

	const getFilter = (columnfilter, id) => {
		switch (id) {
			case 0:
				filter.game_device_compatibility = columnfilter;
				if (filter.game_device_compatibility) {
					if (filter.game_device_compatibility.length === 0)
						delete filter.game_device_compatibility;
				}
				break;
			case 1:
				filter.game_type = columnfilter;
				if (filter.game_type) {
					if (filter.game_type.length === 0) delete filter.game_type;
				}
				break;
			case 2:
				filter.rating_pegi = columnfilter;
				if (filter.rating_pegi) {
					if (filter.rating_pegi.length === 0) delete filter.rating_pegi;
				}
				break;
			case 3:
				filter.number_of_players = columnfilter;
				if (filter.number_of_players) {
					if (filter.number_of_players.length === 0)
						delete filter.number_of_players;
				}
				break;
			default:
				//
				break;
		}

		getProductsByFilter();
	};

	const getProductsByFilter = async () => {
		// console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIi");
		// console.log(filter);
		const productListData = await productsApi.getProductsByFilter(filter);
		// console.log(productListData);
		dispatch(setProducts(productListData));
		console.log(filter);
	};

	const createFilterCard = (categoryType, index) => {
		return (
			<FilterCard
				key={index}
				categoryType={categoryType.name}
				filterCardId={index}
				getFilter={getFilter}
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
