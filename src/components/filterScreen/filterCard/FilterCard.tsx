import React, { useEffect, useState } from "react";
import "./filterCard.css";
import CheckBox from "./checkBox/CheckBox.tsx";
import Collapse from "react-bootstrap/Collapse";
import FilterCardButton from "./filterCardButton/FilterCardButton.tsx";
import axios from "axios";

function FilterCard(props) {
	const { categoryType } = props;
	const [open, setOpen] = useState(true);
	const [catgories, setCategories] = useState([]);

	useEffect(() => {
		axios
			.get("/categories", { params: { categoryType: categoryType } })
			.then((response) => {
				const categoryListData = response.data.map((data) => {
					return {
						id: data.id,
						name: data.category_name,
					};
				});
				setCategories(categoryListData);
			});
	}, []);

	const createCheckbox = (category) => {
		return <CheckBox key={category.id} category={category.name} />;
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
