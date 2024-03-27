import React from "react";
import "./checkBox.css";

function CheckBox(props) {
	const { category } = props;
	return (
		<div className="row checkBox">
			<div className="col-1">
				<input className="" type="checkbox" />
			</div>
			<div className="col-11">
				<label className="">{category}</label>
			</div>
		</div>
	);
}

export default CheckBox;
