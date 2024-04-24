import API from "./api.ts";

const login = async (email, password) => {
	const response = await API.axiosPublic.post(
		"/auth/login",
		{
			email,
			password,
		},
		{ headers: { "Content-Type": "application/json" }, withCredentials: true }
	);
	return response.data;
};

const refresh = async () => {
	const response = await API.axiosPublic.get("/auth/refresh", {
		withCredentials: true,
	});

	return response;
};

const logout = async () => {
	const response = await API.axiosPublic.get("/auth/logout", {
		withCredentials: true,
	});

	return response;
};

export default { login, refresh, logout };
