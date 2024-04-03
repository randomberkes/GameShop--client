import React, { useState } from "react";
import "./sideNavbarButton.css";
import { useDispatch } from "react-redux";
import { setFilterPlatform } from "../../../../Redux/productsSlice.ts";

const SideNavbarButton = (props) => {
	const [hover, setHover] = useState(false);
	const handleMouseOver = () => {
		setHover(true);
	};

	const handleMouseOut = () => {
		setHover(false);
	};
	const { icon, name, hoverColor, setOpen } = props;
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setFilterPlatform(name));
		setOpen(false);
	};
	return (
		<button
			className="sideNavbarButtons"
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onClick={handleClick}
			style={
				hover
					? {
							color: hoverColor,
							borderTopWidth: "2px",
							borderColor: hoverColor,
					  }
					: {}
			}
		>
			{`${name} `} {icon}
		</button>
	);
};

export default SideNavbarButton;
