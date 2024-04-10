import React from "react";
import "./filterCardButton.css";

function FilterCardButton(props) {
	const { setOpen, open, categoryType } = props;

	return (
		<button
			className="filterCard_Button"
			onClick={() => setOpen(!open)}
			aria-controls="example-collapse-text"
			aria-expanded={open}
		>
			<div className="filterCardButton_textIconContainer">
				<h4 className="filterCardButton_Label">{categoryType}</h4>

				<i
					className={`bi ${
						open ? "bi-caret-up" : "bi-caret-down-fill"
					} filterCardButton_Icon`}
				></i>
			</div>
		</button>
	);
}

export default FilterCardButton;
