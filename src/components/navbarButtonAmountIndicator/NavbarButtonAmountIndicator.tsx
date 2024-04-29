import React from "react";
import "./navbarButtonAmountIndicator.css";

const NavbarButtonAmountIndicator = (props) => {
	const { amount } = props;
	return <div className="navbarButtonAmountIndicator__container">{amount}</div>;
};

export default NavbarButtonAmountIndicator;
