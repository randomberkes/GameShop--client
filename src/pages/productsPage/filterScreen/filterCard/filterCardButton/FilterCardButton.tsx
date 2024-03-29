import React from "react";
import "./filterCardButton.css";

function FilterCardButton(props) {
	const { setOpen, open, categoryType } = props;

	return (
		<button
			className="filterCardButton"
			onClick={() => setOpen(!open)}
			aria-controls="example-collapse-text"
			aria-expanded={open}
		>
			<div className="container-fluid ">
				<div className="row filterCardButtonRow justify-content-between">
					<h6 className="col-11 filterCardButtonLabel">{categoryType}</h6>
					<div className="col-1 filterCardIcon">
						<i
							className={`bi ${open ? "bi-caret-up" : "bi-caret-down-fill"}`}
						></i>
					</div>
				</div>
			</div>
		</button>
	);
}

export default FilterCardButton;
