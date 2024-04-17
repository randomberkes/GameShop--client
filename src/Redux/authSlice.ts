import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../DTO/auth";

export interface AuthState {
	authUser: Auth;
}

const initialState: AuthState = {
	authUser: {
		name: "",
		email: "",
		accessToken: "",
		role: "",
	},
};

export const userSlice = createSlice({
	name: "authUser",
	initialState,
	reducers: {
		setAuthUser: (state, action: PayloadAction<Auth>) => {
			state.authUser = action.payload;
		},
		setAccessToken: (state, action: PayloadAction<string>) => {
			state.authUser.accessToken = action.payload;
		},
	},
});

export const { setAuthUser, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
