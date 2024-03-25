import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./navbarButton.css";

function NavbarButton(props) {
	const { icon } = props;
	const [hover, setHover] = useState(false);

	const handleMouseOver = () => {
		setHover(true);
	};

	const handleMouseOut = () => {
		setHover(false);
	};

	const hoverButtonStyle = {
		backgroundColor: "#d65a31",
	};

	return (
		<button
			style={hover ? hoverButtonStyle : {}}
			className="col-4 navbarButton"
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			{icon}
		</button>
	);
}

export default NavbarButton;
