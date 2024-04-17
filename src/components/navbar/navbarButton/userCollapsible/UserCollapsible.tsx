import React, { useState } from "react";
import "./userCollapsible.css";
import useLogedInUser from "../../../../hooks/useLogedInUser.ts";
import CollapsibleButton from "./collapsibleButton/CollapsibleButton.tsx";
import useLogout from "../../../../hooks/useLogout.ts";

const UserCollapsible = () => {
	const logout = useLogout();
	const signOut = () => {
		logout();
	};
	const buttons = [
		{ text: "Saját fiók" },
		{ text: "Kártyáim" },
		{ text: "Rendelések" },
		{ text: "Kijelentkezés", onClick: signOut },
	];

	const createButton = (button) => {
		return <CollapsibleButton text={button.text} onClick={button.onClick} />;
	};

	const { authUser, isAuthenticated } = useLogedInUser();

	return isAuthenticated ? (
		<div className="collapsible__container">
			<h5 className="collapsible__header">{`Hello ${authUser.name}`}</h5>
			{buttons.map(createButton)}
		</div>
	) : (
		<div>no user</div>
	);
};

export default UserCollapsible;
