import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../DTO/product";

export interface favoriteProductsState {
	products: Product[];
}

const initialState: favoriteProductsState = {
	products: [],
};

export const favoriteProductsSlice = createSlice({
	name: "favoriteProducts",
	initialState,
	reducers: {
		setFavoriteProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
		},
		addProductToFavorites: (state, action: PayloadAction<Product>) => {
			let unique = true;
			state.products.forEach((product) => {
				if (product.id === action.payload.id) {
					unique = false;
				}
			});
			if (unique) state.products.push(action.payload);
		},
		deleteProductFromFavorites: (state, action: PayloadAction<number>) => {
			state.products = state.products.filter((product) => {
				return product.id != action.payload;
			});
		},
	},
});

export const {
	addProductToFavorites,
	deleteProductFromFavorites,
	setFavoriteProducts,
} = favoriteProductsSlice.actions;

export default favoriteProductsSlice.reducer;
