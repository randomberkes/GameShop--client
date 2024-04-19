import React from "react";

import "./userButtonIcon.css";
import useLogedInUser from "../../../../hooks/useLogedInUser.ts";

const UserButtonIcon = () => {
	const { authUser, isAuthenticated } = useLogedInUser();

	const makeUserIcon = (): string => {
		const usernameFirstLetter = authUser.name[0];
		return usernameFirstLetter;
	};
	return (
		<>
			{isAuthenticated ? (
				<>{makeUserIcon()?.toUpperCase()}</>
			) : (
				<i className="bi bi-person"></i>
			)}
		</>
	);
};

export default UserButtonIcon;
