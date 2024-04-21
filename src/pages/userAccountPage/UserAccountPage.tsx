import React from "react";
import "./userAccountPage.css";
import UserAccountCard from "../../components/userAccountCard/UserAccountCard.tsx";
import UserAccountNavbar from "../../components/userAccountNavbar/UserAccountNavbar.tsx";
import EditUserDataForm from "../../components/editUserDataForm/EditUserDataForm.tsx";
import { Outlet } from "react-router-dom";

const UserAccountPage = () => {
	return (
		<div className="userAccountPage__container">
			<div>
				<div>
					<UserAccountNavbar />
				</div>
				{/* <EditUserDataForm /> */}
				<Outlet />
				<div className="userAccountPage__user-card-container">
					<UserAccountCard />
				</div>
			</div>
		</div>
	);
};

export default UserAccountPage;
