import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../DTO/product";

export interface CartProduct extends Product {
	productCount: number;
}

export interface cartProductsState {
	products: CartProduct[];
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
			if (unique) {
				state.products.push({ ...action.payload, productCount: 1 });
			}
		},
		deleteProductFromCart: (state, action: PayloadAction<number>) => {
			state.products = state.products.filter((product) => {
				return product.id != action.payload;
			});
		},

		increaseCountOfProduct: (state, action: PayloadAction<number>) => {
			state.products.forEach((product) => {
				if (product.id === action.payload) product.productCount++;
			});
		},
		decreaseCountOfProduct: (state, action: PayloadAction<number>) => {
			state.products.forEach((product) => {
				if (product.id === action.payload) product.productCount--;
			});
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addProductToCart,
	deleteProductFromCart,
	increaseCountOfProduct,
	decreaseCountOfProduct,
} = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
