import React, { useState } from "react";
import "./filterCard.css";
import CheckBox from "./checkBox/CheckBox.tsx";
import Collapse from "react-bootstrap/Collapse";
import FilterCardButton from "./filterCardButton/FilterCardButton.tsx";

function FilterCard() {
	const [open, setOpen] = useState(true);
	return (
		<div className="col-11 filterCard">
			<FilterCardButton setOpen={setOpen} open={open} />
			<Collapse in={open}>
				<div id="example-collapse-text">
					<CheckBox />
					<CheckBox />
					<CheckBox />
					<CheckBox />
				</div>
			</Collapse>
		</div>
	);
}

export default FilterCard;
