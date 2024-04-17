import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import useRefreshToken from "./useRefreshToken.ts";

const useLogedInUser = () => {
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

	return { authUser, isAuthenticated };
};

export default useLogedInUser;
