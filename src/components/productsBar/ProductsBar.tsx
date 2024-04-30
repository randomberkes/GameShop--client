import React, { useState } from "react";
import "./productsBar.css";
import { useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";

const ProductsBar = () => {
	const list = [3, 5, 7];
	const navigate = useNavigate();

	const handleClickFilterButton = () => {
		navigate("/products/filter");
	};
	const [hover, setHover] = useState(false);

	const createPageSizeButtons = (size) => {
		return <button>{size}</button>;
	};
	return (
		<div className="productsBar__container">
			<button className="productsBar__button" onClick={handleClickFilterButton}>
				Szűrő
			</button>
			<button
				className="productsBar__page-size-button"
				onMouseOver={() => {
					setHover(true);
				}}
				onMouseOut={() => {
					setHover(false);
				}}
			>
				{list} / oldal
			</button>
			<div className="productsBar__collapse-container">
				<Collapse in={hover}>
					<div
						className="productsBar__collapse"
						onMouseOver={() => {
							setHover(true);
						}}
						onMouseOut={() => {
							setHover(false);
						}}
					>
						{list.map(createPageSizeButtons)}
					</div>
				</Collapse>
			</div>
		</div>
	);
};

export default ProductsBar;
