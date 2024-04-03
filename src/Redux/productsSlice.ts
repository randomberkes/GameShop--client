import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../DTO/product";
import { Filter } from "../DTO/filter";

export interface ProductsState {
	products: Product[];
	filter: Filter;
}

const initialState: ProductsState = {
	products: [],
	filter: {},
};

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
		},
		setFilterPlatform: (state, action: PayloadAction<string>) => {
			state.filter.platform = [action.payload];
		},
		setFilter: (
			state,
			action: PayloadAction<{
				category: string;
				categoryTypeId: number;
				checkedCategory: boolean;
			}>
		) => {
			switch (action.payload.categoryTypeId) {
				case 0:
					if (state.filter.game_device_compatibility) {
						if (action.payload.checkedCategory) {
							state.filter.game_device_compatibility.push(
								action.payload.category
							);
						} else {
							state.filter.game_device_compatibility =
								state.filter.game_device_compatibility.filter((category) => {
									return category !== action.payload.category;
								});
							if (state.filter.game_device_compatibility.length === 0)
								delete state.filter.game_device_compatibility;
						}
					} else {
						if (action.payload.checkedCategory) {
							state.filter.game_device_compatibility = [];
							state.filter.game_device_compatibility.push(
								action.payload.category
							);
						}
					}
					break;
				case 1:
					if (state.filter.game_type) {
						if (action.payload.checkedCategory) {
							state.filter.game_type.push(action.payload.category);
						} else {
							state.filter.game_type = state.filter.game_type.filter(
								(category) => {
									return category !== action.payload.category;
								}
							);
							if (state.filter.game_type.length === 0)
								delete state.filter.game_type;
						}
					} else {
						if (action.payload.checkedCategory) {
							state.filter.game_type = [];
							state.filter.game_type.push(action.payload.category);
						}
					}
					break;
				case 2:
					if (state.filter.rating_pegi) {
						if (action.payload.checkedCategory) {
							state.filter.rating_pegi.push(action.payload.category);
						} else {
							state.filter.rating_pegi = state.filter.rating_pegi.filter(
								(category) => {
									return category !== action.payload.category;
								}
							);
							if (state.filter.rating_pegi.length === 0)
								delete state.filter.rating_pegi;
						}
					} else {
						if (action.payload.checkedCategory) {
							state.filter.rating_pegi = [];
							state.filter.rating_pegi.push(action.payload.category);
						}
					}
					break;
				case 3:
					if (state.filter.number_of_players) {
						if (action.payload.checkedCategory) {
							state.filter.number_of_players.push(action.payload.category);
						} else {
							state.filter.number_of_players =
								state.filter.number_of_players.filter((category) => {
									return category !== action.payload.category;
								});
							if (state.filter.number_of_players.length === 0)
								delete state.filter.number_of_players;
						}
					} else {
						if (action.payload.checkedCategory) {
							state.filter.number_of_players = [];
							state.filter.number_of_players.push(action.payload.category);
						}
					}
					break;
				default:
					//
					break;
			}
			console.log("Filter 1");
			console.log(state.filter);
		},
	},
});

// Action creators are generated for each case reducer function
export const { setProducts, setFilter, setFilterPlatform } =
	productsSlice.actions;

export default productsSlice.reducer;
