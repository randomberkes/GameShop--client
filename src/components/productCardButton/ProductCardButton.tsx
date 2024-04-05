import React, { useState } from "react";
import "./productCardButton.css";

function ProductCardButton(props) {
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
			className=" productCard_Button"
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onClick={handleClick}
		>
			{icon}
		</button>
	);
}

export default ProductCardButton;
