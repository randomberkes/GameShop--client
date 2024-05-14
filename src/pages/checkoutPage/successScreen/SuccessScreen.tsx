import React, { useState } from "react";
import "./successScreen.css";
import { useNavigate } from "react-router-dom";

const SuccessScreen = () => {
	const [hover, setHover] = useState(false);
	const navigate = useNavigate();
	return (
		<div className="successScreen__container">
			<div>
				<h1>A vásárlás sikeres</h1>
			</div>
			<div>
				<button
					className={hover ? "successScreen__button_hover" : ""}
					onMouseOver={() => {
						setHover(true);
					}}
					onMouseOut={() => {
						setHover(false);
					}}
					onClick={() => {
						navigate("/products");
					}}
				>
					Vissza a webáruházba
				</button>
			</div>
		</div>
	);
};

export default SuccessScreen;
