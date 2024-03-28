import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "../DTO/categoryType";

export interface CategoryTypesState {
	categoryTypes: CategoryType[];
}

const initialState: CategoryTypesState = {
	categoryTypes: [],
};

export const categoryTypesSlice = createSlice({
	name: "categoryTypes",
	initialState,
	reducers: {
		// increment: (state) => {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes
		// 	state.value += 1;
		// },
		// decrement: (state) => {
		// 	state.value -= 1;
		// },
		setCategoryTypes: (state, action: PayloadAction<CategoryType[]>) => {
			state.categoryTypes = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCategoryTypes } = categoryTypesSlice.actions;

export default categoryTypesSlice.reducer;
