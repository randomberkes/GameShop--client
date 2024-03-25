import React, { useState } from "react";
import "./productCardButton.css";

function ProductCardButton(props) {
	const { icon } = props;
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
			className="col-4 productCardButton"
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			{icon}
		</button>
	);
}

export default ProductCardButton;
