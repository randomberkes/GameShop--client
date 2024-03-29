import React, { useState } from "react";
import "./favoriteProductCardButton.css";

function FavoriteProductCardButton(props) {
	const { icon, handleClick } = props;
	const [hover, setHover] = useState(false);

	const handleMouseOver = () => {
		setHover(true);
	};

	const handleMouseOut = () => {
		setHover(false);
	};

	const hoverCardButtonStyle = {
		color: "#d65a31",
	};

	return (
		<button
			style={hover ? hoverCardButtonStyle : {}}
			className=" productCardButton"
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onClick={handleClick}
		>
			{icon}
		</button>
	);
}

export default FavoriteProductCardButton;
