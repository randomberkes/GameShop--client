import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import useRefreshToken from "../../../../hooks/useRefreshToken.ts";
import "./userButtonIcon.css";

const UserButtonIcon = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(true);
	const { authUser } = useSelector((state: RootState) => state.auth);
	const refresh = useRefreshToken();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				setIsAuthenticated(false);
				console.log(err);
			}
		};
		if (authUser.accessToken === "") {
			verifyRefreshToken();
		}
	}, [authUser]);

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
