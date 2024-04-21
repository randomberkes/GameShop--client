import { useDispatch } from "react-redux";
import authApi from "../api/authApi.ts";
import { setAuthUser } from "../Redux/authSlice.ts";
// import { useLocation, useNavigate } from "react-router-dom";

const useLogin = () => {
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	// const location = useLocation();

	const logout = async (emailInput: any, passwordInput: any) => {
		// try {
		// 	await authApi.logout();
		// 	dispatch(setAuthUser({ name: "", email: "", role: "", accessToken: "" }));
		// 	navigate("/login", { state: { from: location } });
		// } catch (err) {
		// 	console.log(err);
		// }

		try {
			const auth = await authApi.login(emailInput, passwordInput);
			const accessToken = auth.accessToken;
			const role = auth.role;
			const name = auth.name;
			dispatch(
				setAuthUser({
					name: name,
					email: emailInput,
					accessToken: accessToken,
					role: role,
				})
			);
			// navigate(from);
		} catch (err) {
			// if (!err?.response) {
			// 	setErrMsg("No Server Response");
			// } else if (err.response?.status === 401) {
			// 	setErrMsg("Unauthorized");
			// } else {
			// 	setErrMsg("Login Failed");
			// }
			console.log(err);
		}
	};

	return logout;
};

export default useLogin;
