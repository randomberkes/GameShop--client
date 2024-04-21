import { useDispatch, useSelector } from "react-redux";
import authApi from "../api/authApi.ts";
import { setAuthUser } from "../Redux/authSlice.ts";
import { RootState } from "../Redux/store.ts";
import { useLocation, useNavigate } from "react-router-dom";

const useRefreshToken = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const refresh = async () => {
		try {
			const response = await authApi.refresh();
			const authUser = response.data;
			dispatch(setAuthUser(authUser));
			return authUser;
		} catch {
			if (authUser.name !== "")
				navigate("/login", { state: { from: location } });
		}
	};

	return refresh;
};

export default useRefreshToken;
