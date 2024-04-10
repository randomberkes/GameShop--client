import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.ts";
import categoryTypesReducer from "./categoryTypesSlice.ts";
import favoriteProductsReducer from "./favoriteProductsSlice.ts";
import cartProductsReducer from "./cartProductsSlice.ts";
import userReducer from "./userSlice.ts";
export const store = configureStore({
	reducer: {
		products: productsReducer,
		categoryTypes: categoryTypesReducer,
		favoriteProducts: favoriteProductsReducer,
		cartProducts: cartProductsReducer,
		user: userReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

//pasport
