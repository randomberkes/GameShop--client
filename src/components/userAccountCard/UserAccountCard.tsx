import React, { useState } from "react";
import "./userAccountCard.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Outlet, useNavigate } from "react-router-dom";

const UserAccountCard = () => {
	const navigate = useNavigate();
	const { authUser } = useSelector((state: RootState) => state.auth);
	const [hover, setHover] = useState(false);
	return (
		<>
			<Outlet />
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
				<button
					className="userAccountCard__button"
					onClick={() => {
						navigate("/user/myAccount/edit");
					}}
				>
					Adatok módosítása
				</button>
			</div>
		</>
	);
};

export default UserAccountCard;
