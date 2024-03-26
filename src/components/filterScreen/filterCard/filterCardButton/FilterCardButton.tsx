import React from "react";
import "./filterCardButton.css";

function FilterCardButton(props) {
	const { setOpen, open } = props;

	return (
		<button
			className="filterCardButton"
			onClick={() => setOpen(!open)}
			aria-controls="example-collapse-text"
			aria-expanded={open}
		>
			<div className="container-fluid ">
				<div className="row justify-content-between">
					<div className="col-2">
						<label>Kategoria</label>
					</div>
					<div className="col-1">
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
