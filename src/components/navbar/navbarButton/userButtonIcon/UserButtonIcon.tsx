import React from "react";
import "./userButtonIcon.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store.ts";

const UserButtonIcon = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);

	const makeUserIcon = (): string => {
		const usernameFirstLetter = authUser.name[0];
		return usernameFirstLetter;
	};
	return (
		<>
			{authUser.name !== "" ? (
				<>{makeUserIcon()?.toUpperCase()}</>
			) : (
				<i className="bi bi-person"></i>
			)}
		</>
	);
};

export default UserButtonIcon;
