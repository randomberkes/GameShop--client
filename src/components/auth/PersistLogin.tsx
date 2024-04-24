import { useSelector } from "react-redux";
import useRefreshToken from "../../hooks/useRefreshToken.ts";
import { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import React from "react";

const PersistsLogin = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const refresh = useRefreshToken();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};
		authUser.accessToken === "" ? verifyRefreshToken() : setIsLoading(false);
	}, [authUser]);

	return <>{isLoading ? <p>Loading</p> : <Outlet />}</>;
};

export default PersistsLogin;
