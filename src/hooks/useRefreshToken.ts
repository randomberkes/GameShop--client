import { useDispatch } from "react-redux";
import authApi from "../api/authApi.ts";
import { setAuthUser } from "../Redux/authSlice.ts";

const useRefreshToken = () => {
	const dispatch = useDispatch();
	const refresh = async () => {
		const response = await authApi.refresh();
		const authUser = response.data;
		dispatch(setAuthUser(authUser));
		return authUser;
	};

	return refresh;
};

export default useRefreshToken;
