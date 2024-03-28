import React, { useEffect, useState } from "react";
import "./filterCard.css";
import CheckBox from "./checkBox/CheckBox.tsx";
import Collapse from "react-bootstrap/Collapse";
import FilterCardButton from "./filterCardButton/FilterCardButton.tsx";
import categoriesApi from "../../../api/categoriesApi.ts";
import { Category } from "../../../DTO/category.ts";

function FilterCard(props) {
	const { categoryType, getFilter, filterCardId } = props;
	const [open, setOpen] = useState(true);
	const [catgories, setCategories] = useState<Category[]>([]);

	const checkedCategories = catgories.map((category) => {
		return { checked: false, category: category.name };
	});

	useEffect(() => {
		getCategoriesByType(categoryType);
	}, []);

	const getCheckedCategory = (id) => {
		checkedCategories[id].checked = !checkedCategories[id].checked;
		const resultcheckedCategories = checkedCategories
			.filter((category) => {
				return category.checked == true;
			})
			.map((category) => {
				return category.category;
			});

		getFilter(resultcheckedCategories, filterCardId);
	};
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
				category={category.name}
				categoryFunc={getCheckedCategory}
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
