import React, { useState } from "react";
import "./userAccountCard.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const UserAccountCard = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const [hover, setHover] = useState(false);
	return (
		<>
			<div className="userAccountCard__container">
				<div className="userAccountCard__header-container">A fiók adatai</div>
				<div className="userAccountCard__user-icon-container">
					<div className="userAccountCard__user-icon">
						<p>{authUser.name[0].toUpperCase()}</p>
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
			</div>
			<div
				className={
					"userAccountCard__button-container" +
					(hover ? " userAccountCard__hover" : "")
				}
				onMouseOver={() => {
					setHover(true);
				}}
				onMouseOut={() => {
					setHover(false);
				}}
			>
				<button className="userAccountCard__button">Adatok módosítása</button>
			</div>
		</>
	);
};

export default UserAccountCard;
