import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken.ts";
import { useEffect } from "react";
import { RootState } from "../Redux/store";
import API from "../api/api.ts";

const useAxiosPrivate = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const refresh = useRefreshToken();

	useEffect(() => {
		const requestIntercept = API.axiosPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers["Authorization"]) {
					console.log(authUser.accessToken);
					config.headers["Authorization"] = `Bearer ${authUser.accessToken}`;
				}

				return config;
			},
			(err) => {
				Promise.reject(err);
			}
		);

		const responseIntercept = API.axiosPrivate.interceptors.response.use(
			(response) => response,
			async (err) => {
				const prevRequiest = err?.config;
				if (err?.response?.status === 403 && !prevRequiest?.sent) {
					prevRequiest.sent = true;
					const { accessToken } = await refresh();
					prevRequiest.headers["Authorization"] = `Bearer ${accessToken}`;
					return API.axiosPrivate(prevRequiest);
				}

				return Promise.reject(err);
			}
		);

		return () => {
			API.axiosPrivate.interceptors.request.eject(requestIntercept);
			API.axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [authUser, refresh]);

	return API.axiosPrivate;
};

export default useAxiosPrivate;
