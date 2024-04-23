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
		setCategoryTypes: (state, action: PayloadAction<CategoryType[]>) => {
			state.categoryTypes = action.payload;
		},
	},
});

export const { setCategoryTypes } = categoryTypesSlice.actions;

export default categoryTypesSlice.reducer;
