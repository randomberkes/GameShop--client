import React, { useState } from "react";
import "./userAccountNavbarButton.css";

const UserAccountNavbarButton = (props) => {
	const { icon, color, onClick, text } = props;
	const [hover, setHover] = useState(false);
	return (
		<div>
			<button
				className={
					"userAccountNavbarButton__button" +
					(text === "Kijelentkezés" ? " noBorder" : "") +
					(hover ? " hover" : "")
				}
				onMouseOver={() => {
					setHover(true);
				}}
				onMouseOut={() => {
					setHover(false);
				}}
				onClick={onClick}
			>
				<div
					className="userAccountNavbarButton__icon-container"
					style={{ backgroundColor: color }}
				>
					{icon}
				</div>
				{text}
			</button>
		</div>
	);
};

export default UserAccountNavbarButton;
