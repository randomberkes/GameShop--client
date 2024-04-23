import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.ts";
import categoryTypesReducer from "./categoryTypesSlice.ts";
import favoriteProductsReducer from "./favoriteProductsSlice.ts";
import cartProductsReducer from "./cartProductsSlice.ts";
import authReducer from "./authSlice.ts";
import offersReducer from "./offerSlice.ts";
export const store = configureStore({
	reducer: {
		products: productsReducer,
		categoryTypes: categoryTypesReducer,
		favoriteProducts: favoriteProductsReducer,
		cartProducts: cartProductsReducer,
		auth: authReducer,
		offers: offersReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
