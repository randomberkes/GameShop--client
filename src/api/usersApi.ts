import { User } from "../DTO/user.ts";
import API from "./api.ts";

const getUserByEmail = async (email): Promise<User | string> => {
	let user: User;
	try {
		const response = await API.axiosPublic.get("/users/email", {
			params: { email: email },
		});

		if (response.data.id) {
			user = {
				name: response.data.name,
				email: response.data.email,
				password: response.data.password,
				roles: response.data.roles,
			};

			return user;
		}
	} catch (err) {
		console.log(err);
	}
	return "";
};

const updateUser = async (user: any, axiosPrivate: any) => {
	return await API.axiosPrivate.put("/user", user);
};
const postUser = async (user: User) => {
	return await API.axiosPublic.post("/auth/register", user);
};

const getUsers = async (axiosPrivate: any) => {
	return await axiosPrivate.get("/users/all");
};

export default { getUserByEmail, postUser, getUsers, updateUser };
