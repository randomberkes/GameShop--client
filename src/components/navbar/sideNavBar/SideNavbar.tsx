import React, { useState } from "react";
import "./sideNavbar.css";
import Collapse from "@mui/material/Collapse";
import SideNavbarButton from "./sideNavbarButton/SideNavbarButton.tsx";

const SideNavbar = (props) => {
	const { icon, showSearchBar } = props;
	const [hover, setHover] = useState(false);
	const [open, setOpen] = useState(false);

	const icons = [
		{
			name: "PlayStation",
			icon: <i className="bi bi-playstation"></i>,
			hoverColor: "#006FCD",
		},
		{
			name: "Xbox",
			icon: <i className="bi bi-xbox"></i>,
			hoverColor: "#107C10",
		},
		{ name: "PC", icon: <i className="bi bi-pc"></i>, hoverColor: "#E72929" },
	];

	const handleMouseOver = () => {
		setHover(true);
	};

	const handleMouseOut = () => {
		setHover(false);
	};

	const hoverButtonStyle = {
		color: "#d65a31",
	};

	const createSideNavbarButton = (buttonData) => {
		return (
			<SideNavbarButton
				icon={buttonData.icon}
				name={buttonData.name}
				hoverColor={buttonData.hoverColor}
				setOpen={setOpen}
			/>
		);
	};
	return (
		<div>
			<div className={` ${showSearchBar ? "hideButton" : ""}`}>
				<button
					className="sideNavbarButton"
					style={hover ? hoverButtonStyle : {}}
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
					onClick={() => setOpen(!open)}
					aria-controls="example-collapse-text"
					aria-expanded={open}
				>
					{icon}
				</button>
			</div>
			<div className="absoluteContainer">
				<Collapse in={open}>
					<div className="sideNavbar" id="example-collapse-text">
						{icons.map(createSideNavbarButton)}
					</div>
				</Collapse>
			</div>
		</div>
	);
};

export default SideNavbar;
