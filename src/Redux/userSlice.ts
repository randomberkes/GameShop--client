import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../DTO/user";

export interface userState {
	user: User;
}

const initialState: userState = {
	user: { id: 0, name: "", email: "", password: "" },
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserEmail: (state, action: PayloadAction<string>) => {
			state.user.email = action.payload;
		},
		setUserName: (state, action: PayloadAction<string>) => {
			state.user.name = action.payload;
		},
		setUserPassword: (state, action: PayloadAction<string>) => {
			state.user.password = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUserEmail, setUserName, setUserPassword } = userSlice.actions;

export default userSlice.reducer;
