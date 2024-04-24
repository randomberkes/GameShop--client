import React from "react";
import "./userAccountNavbar.css";
import UserAccountNavbarButton from "./userAccountNavbarButton/UserAccountNavbarButton.tsx";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store.ts";

const UserAccountNavbar = () => {
	const navigate = useNavigate();
	const logout = useLogout();
	const { authUser } = useSelector((state: RootState) => state.auth);
	const buttons = [
		{
			icon: (
				<i className="userAccountNavbarButton__icon bi bi-credit-card-2-back-fill"></i>
			),
			color: " #006fcd",
			onClick: () => {},
			text: "Kártyáim",
		},
		{
			icon: (
				<i className=" userAccountNavbarButton__icon bi bi-rocket-takeoff-fill"></i>
			),
			color: " #006fcd",
			onClick: () => {
				navigate("/user/purchases");
			},
			text: "Vásárlások",
		},
		{
			icon: <i className="userAccountNavbarButton__icon bi bi-joystick"></i>,
			color: "#107c10",
			onClick: () => {},
			text: "Játékaim",
		},
		{
			icon: <i className="userAccountNavbarButton__icon bi-cart-dash-fill"></i>,
			color: "#107c10",
			onClick: () => {
				navigate("/cart");
			},
			text: "Kosár",
		},
		{
			icon: <i className="userAccountNavbarButton__icon bi-heart-fill"></i>,
			color: "#e72929",
			onClick: () => {
				navigate("/favorites");
			},
			text: "Kedvencek",
		},
		{
			icon: <i className="userAccountNavbarButton__icon bi bi-power"></i>,
			color: "#e72929",
			onClick: () => {
				logout();
			},
			text: "Kijelentkezés",
		},
	];

	const createButton = (button) => {
		return (
			<UserAccountNavbarButton
				icon={button.icon}
				color={button.color}
				onClick={button.onClick}
				text={button.text}
			/>
		);
	};
	return (
		<>
			<div
				className="userAccountNavbar__header"
				onClick={() => {
					navigate("/user/myAccount/edit");
				}}
			>
				<div className="userAccountNavbar__icon-container">
					<div className="userAccountNavbar__user-icon ">
						<p>{authUser.name[0].toUpperCase()}</p>
					</div>
				</div>
				<div className="userAccountNavbar__name-container">
					<p>{authUser.name}</p>
				</div>
				<div className="userAccountNavbar__icon-container">
					<div>
						<i className="bi bi-pencil-fill"></i>
					</div>
				</div>
			</div>
			<div className="userAccountNavbar__container">
				{buttons.map(createButton)}
			</div>
		</>
	);
};

export default UserAccountNavbar;
