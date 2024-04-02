import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./navbarButton.css";
import { Link, useLocation } from "react-router-dom";

function NavbarButton(props) {
	let { pathname } = useLocation();
	const { icon, link, label, customClass, showSearchBar } = props;
	const [hover, setHover] = useState(false);

	const handleMouseOver = () => {
		setHover(true);
	};

	const handleMouseOut = () => {
		setHover(false);
	};

	const hoverButtonStyle = {
		color: "#d65a31",
	};
	console.log(showSearchBar);

	return (
		<div className={`navButtonContainer ${showSearchBar ? "hideButton" : ""}`}>
			<Link
				to={link}
				style={hover ? hoverButtonStyle : {}}
				className={`navbarButton ${
					link == pathname ? "navbarButtonSelected" : ""
				}`}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				{icon}
			</Link>
			{label != "" ? <div className="navbarButtonLabel">{label}</div> : null}
		</div>
	);
}

export default NavbarButton;
