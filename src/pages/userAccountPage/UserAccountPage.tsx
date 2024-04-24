import React from "react";
import "./userAccountPage.css";
import UserAccountCard from "../../components/userAccountCard/UserAccountCard.tsx";
import UserAccountNavbar from "../../components/userAccountNavbar/UserAccountNavbar.tsx";
import EditUserDataForm from "../../components/editUserDataForm/EditUserDataForm.tsx";
import { Outlet, useLocation } from "react-router-dom";

const UserAccountPage = () => {
	const location = useLocation();
	return (
		<div className="userAccountPage__container">
			<div>
				<div className="userAccountPage__menu-container">
					<UserAccountNavbar />
				</div>

				<div className="userAccountPage__user-card-container">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default UserAccountPage;
