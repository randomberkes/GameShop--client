import React from "react";
import "./userAccountPage.css";
import UserAccountCard from "../../components/userAccountCard/UserAccountCard.tsx";
import UserAccountNavbar from "../../components/userAccountNavbar/UserAccountNavbar.tsx";

const UserAccountPage = () => {
	return (
		<div className="userAccountPage__container">
			<div>
				<div>
					<UserAccountNavbar />
				</div>
				<div>
					<UserAccountCard />
				</div>
			</div>
		</div>
	);
};

export default UserAccountPage;
