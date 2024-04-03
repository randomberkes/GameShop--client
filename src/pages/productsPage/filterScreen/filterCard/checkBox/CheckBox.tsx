import React, { useState } from "react";
import "./checkBox.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setProducts } from "../../../../../Redux/productsSlice.ts";

function CheckBox(props) {
	const [checked, setChecked] = useState(false);
	const { category, id, categoryTypeId } = props;
	const dispatch = useDispatch();

	const handleChange = async () => {
		setChecked(!checked);
		const currentChecked = !checked;
		// categoryFunc(id);
		console.log({
			category: category,
			categoryTypeId: categoryTypeId,
			checkedCategory: currentChecked,
		});
		await dispatch(
			setFilter({
				category: category,
				categoryTypeId: categoryTypeId,
				checkedCategory: currentChecked,
			})
		);
		console.log("Filter 3");
		// console.log(filter);
		// getProductsByFilter();
	};
	return (
		<div className="row checkBox ">
			<div className="col-1 checkBoxIcon">
				<input
					className=""
					type="checkbox"
					onChange={handleChange}
					checked={checked}
				/>
			</div>
			<div
				className="col-11 checKboxText"
				onClick={() => {
					console.log(checked);
				}}
			>
				{category}
			</div>
		</div>
	);
}

export default CheckBox;
