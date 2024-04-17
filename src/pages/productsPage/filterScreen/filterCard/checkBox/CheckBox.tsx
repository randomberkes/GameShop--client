import React, { useState } from "react";
import "./checkBox.css";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../../../Redux/productsSlice.ts";

function CheckBox(props) {
	const [checked, setChecked] = useState(false);
	const { category, categoryTypeId } = props;
	const dispatch = useDispatch();

	const handleChange = async () => {
		setChecked(!checked);
		const currentChecked = !checked;

		await dispatch(
			setFilter({
				category: category,
				categoryTypeId: categoryTypeId,
				checkedCategory: currentChecked,
			})
		);
	};
	return (
		<div className="checkBox_checkBoxTextContainer ">
			<input
				className=""
				type="checkbox"
				onChange={handleChange}
				checked={checked}
			/>

			<p className="checkBox_Text">{category}</p>
		</div>
	);
}

export default CheckBox;
