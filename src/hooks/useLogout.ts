import { useDispatch } from "react-redux";
import authApi from "../api/authApi.ts";
import { setAuthUser } from "../Redux/authSlice.ts";

const useLogout = () => {
	const dispatch = useDispatch();

	const logout = async () => {
		try {
			const response = await authApi.logout();
			dispatch(setAuthUser({ name: "", email: "", role: "", accessToken: "" }));
		} catch (err) {
			console.log(err);
		}
	};

	return logout;
};

export default useLogout;
