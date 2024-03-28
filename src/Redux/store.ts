import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.ts";
import categoryTypesReducer from "./categoryTypesSlice.ts";
export const store = configureStore({
	reducer: {
		products: productsReducer,
		categoryTypes: categoryTypesReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
