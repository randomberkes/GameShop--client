import React from "react";
import "./userAccountCard.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store.ts";

const UserAccountCard = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	return (
		<div className="userAccountCard__container">
			<div className="userAccountCard__header-container">A fiók adatai</div>
			<div className="userAccountCard__user-icon-container">
				<div className="userAccountCard__user-icon">
					<p>R</p>
				</div>
			</div>
			<div className="userAccountCard__user-information-container">
				<ul>
					<li>
						<p>{`Név: ${authUser.name}`}</p>
					</li>
					<li>
						<p>{`Email: ${authUser.email}`}</p>
					</li>
				</ul>
			</div>
			<div className="userAccountCard__button-container">
				<button className="userAccountCard__button">Adatok módosítása</button>
			</div>
		</div>
	);
};

export default UserAccountCard;
