import { User } from "../DTO/user.ts";
import API from "./api.ts";

export const getUserByEmail = async (email): Promise<User | string> => {
	let user: User;
	try {
		const response = await API.get("/users/email", {
			params: { email: email },
		});
		if (response.data.id) {
			user = {
				id: response.data.id,
				name: response.data.name,
				email: response.data.email,
				password: response.data.password,
			};

			return user;
		}
	} catch (e) {
		console.log(e);
	}
	return "";
};

export default { getUserByEmail: getUserByEmail };
