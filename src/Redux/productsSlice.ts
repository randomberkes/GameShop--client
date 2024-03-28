import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../DTO/product";

export interface ProductsState {
	products: Product[];
}

const initialState: ProductsState = {
	products: [],
};

export const productsSlice = createSlice({
	name: "products",
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
		setProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
