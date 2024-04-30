import React, { useEffect, useState } from "react";
import "./filterScreen.css";
import FilterCard from "./filterCard/FilterCard.tsx";
import categoryTypesApi from "../../../api/categoryTypesApi.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import { setCategoryTypes } from "../../../Redux/categoryTypesSlice.ts";
import { useNavigate } from "react-router-dom";
function FilterScreen() {
	const { categoryTypes } = useSelector(
		(state: RootState) => state.categoryTypes
	);
	const [hover, setHover] = useState(false);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	useEffect(() => {
		getAllCategoryTypes();
	}, []);

	const handleApplyButtonClick = () => {
		navigate("/products");
	};
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
			<div className="filterScreen__button-container">
				<button
					className={
						"filterScreen__button" +
						(hover ? " filterScreen__button-hover" : "")
					}
					onClick={handleApplyButtonClick}
					onMouseOver={() => {
						setHover(true);
					}}
					onMouseOut={() => {
						setHover(false);
					}}
				>
					Alkalmaz
				</button>
			</div>
		</div>
	);
}

export default React.memo(FilterScreen);
