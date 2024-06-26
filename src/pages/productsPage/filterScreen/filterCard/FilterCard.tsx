import React, { useEffect, useState } from "react";
import "./filterCard.css";
import CheckBox from "./checkBox/CheckBox.tsx";
import FilterCardButton from "./filterCardButton/FilterCardButton.tsx";
import categoriesApi from "../../../../api/categoriesApi.ts";
import { Category } from "../../../../DTO/category.ts";
import Collapse from "@mui/material/Collapse";

function FilterCard(props) {
	const { categoryType, filterCardId } = props;
	const [open, setOpen] = useState(true);
	const [catgories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		getCategoriesByType(categoryType);
	}, []);

	const getCategoriesByType = async (categoryType) => {
		const categoriesListData = await categoriesApi.getCategoriesByType(
			categoryType
		);
		setCategories(categoriesListData);
	};

	const createCheckbox = (category, index) => {
		return (
			<CheckBox
				key={index}
				categoryTypeId={filterCardId}
				category={category.name}
				id={index}
			/>
		);
	};
	return (
		<div className="col-11 filterCard">
			<FilterCardButton
				categoryType={categoryType}
				setOpen={setOpen}
				open={open}
			/>
			<Collapse in={open}>
				<div id="example-collapse-text">{catgories.map(createCheckbox)}</div>
			</Collapse>
		</div>
	);
}

export default FilterCard;
