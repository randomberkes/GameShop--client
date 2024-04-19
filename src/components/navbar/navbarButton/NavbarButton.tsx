import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "./navbarButton.css";
import { Link, useLocation } from "react-router-dom";
import Collapse from "@mui/material/Collapse";

function NavbarButton(props) {
	const location = useLocation();

	const { icon, link, label, showSearchBar, collapsible } = props;
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

	return (
		<div className={`navButtonContainer ${showSearchBar ? "hideButton" : ""}`}>
			<div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
				<Link
					to={link}
					style={hover ? hoverButtonStyle : {}}
					className={`navbarButton ${
						link === location ? "navbarButtonSelected" : ""
					}`}
					state={{ from: location }}
				>
					{icon}
				</Link>
				{label !== "" ? <div className="navbarButtonLabel">{label}</div> : null}
			</div>
			<div className="navbarButton__absoluteContainer">
				<Collapse in={hover}>
					<div
						className="navbarButton__collapsible"
						onMouseOver={handleMouseOver}
						onMouseOut={handleMouseOut}
					>
						{collapsible}
					</div>
				</Collapse>
			</div>
		</div>
	);
}

export default NavbarButton;
