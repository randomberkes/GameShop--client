import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserAccountNavbar from "../../components/userAccountNavbar/UserAccountNavbar.tsx";
import UserMenuBar from "../../components/userMenuBar/userMenuBar.tsx";
import "./userAccountPage.css";

const UserAccountPage = () => {
	const location = useLocation();
	return (
		<div className="userAccountPage__container">
			<div>
				<div className="userAccountPage__menu-container">
					<UserAccountNavbar />
				</div>

				<div className="userAccountPage__user-card-container">
					{location.pathname !== "/user/nav" ? <UserMenuBar /> : <></>}
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default UserAccountPage;
