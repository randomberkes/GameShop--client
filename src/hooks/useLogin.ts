import { useDispatch } from "react-redux";
import authApi from "../api/authApi.ts";
import { setAuthUser } from "../Redux/authSlice.ts";

const useLogin = () => {
	const dispatch = useDispatch();

	const logout = async (emailInput: any, passwordInput: any) => {
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
		} catch (err) {
			console.log(err);
		}
	};

	return logout;
};

export default useLogin;
