import React, { useState } from "react";
import "./checkBox.css";

function CheckBox(props) {
	const [checked, setChecked] = useState(false);
	const { category, categoryFunc, id } = props;

	const handleChange = () => {
		setChecked(!checked);
		categoryFunc(id);
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
