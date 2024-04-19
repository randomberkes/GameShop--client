import { useDispatch } from "react-redux";
import authApi from "../api/authApi.ts";
import { setAuthUser } from "../Redux/authSlice.ts";
import { useLocation, useNavigate } from "react-router-dom";

const useLogout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const logout = async () => {
		try {
			await authApi.logout();
			dispatch(setAuthUser({ name: "", email: "", role: "", accessToken: "" }));
			navigate("/login", { state: { from: location } });
		} catch (err) {
			console.log(err);
		}
	};

	return logout;
};

export default useLogout;
