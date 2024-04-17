import React, { useState } from "react";
import "./collapsibleButton.css";
const CollapsibleButton = (props) => {
	const [hover, setHover] = useState(false);
	const { text, onClick } = props;
	const handleMouseOver = () => {
		setHover(true);
	};
	const handleMouseOut = () => {
		setHover(false);
	};

	return (
		<button
			className={
				"collapsible-button__button" +
				(text === "Kijelentkezés" ? " collapsible-button__logout-button" : "") +
				(hover ? " collapsible-button__button_hover" : "")
			}
			onClick={onClick}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			{text}
		</button>
	);
};

export default CollapsibleButton;
