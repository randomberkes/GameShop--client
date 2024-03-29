import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../DTO/product";

export interface cartProductsState {
	products: Product[];
}

const initialState: cartProductsState = {
	products: [],
};

export const cartProductsSlice = createSlice({
	name: "cartProducts",
	initialState,
	reducers: {
		addProductToCart: (state, action: PayloadAction<Product>) => {
			let unique = true;
			state.products.forEach((product) => {
				if (product.id === action.payload.id) {
					unique = false;
				}
			});
			if (unique) state.products.push(action.payload);
		},
		deleteProductFromCart: (state, action: PayloadAction<number>) => {
			state.products = state.products.filter((product) => {
				return product.id != action.payload;
			});
		},
	},
});

// Action creators are generated for each case reducer function
export const { addProductToCart, deleteProductFromCart } =
	cartProductsSlice.actions;

export default cartProductsSlice.reducer;
