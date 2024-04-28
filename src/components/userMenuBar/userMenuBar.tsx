import React from "react";
import "./userMenuBar.css";
import { useNavigate } from "react-router-dom";

const UserMenuBar = () => {
	const navigate = useNavigate();
	return (
		<div
			className="userMenuBar__container"
			onClick={() => {
				navigate("/user/nav");
			}}
		>
			<i className="bi bi-list"></i>
		</div>
	);
};

export default UserMenuBar;
