import React from "react";
import "./checkBox.css";

function CheckBox() {
	return (
		<div className="row checkBox">
			<div className="col-1">
				<input className="" type="checkbox" />
			</div>
			<div className="col-11">
				<label className="">Default checkbox</label>
			</div>
		</div>
	);
}

export default CheckBox;
