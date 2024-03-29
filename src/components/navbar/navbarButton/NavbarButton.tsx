import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./navbarButton.css";
import { Link } from "react-router-dom";

function NavbarButton(props) {
	const { icon, link } = props;
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
		<div className="col-2">
			<Link
				to={link}
				style={hover ? hoverButtonStyle : {}}
				className="navbarButton"
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				{icon}
			</Link>
		</div>
	);
}

export default NavbarButton;
