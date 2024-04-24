import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Offer } from "../DTO/offer";
import { CartOffer } from "../DTO/cartOffer";

export interface offersState {
	favoriteOffers: Offer[];
	cartOffers: CartOffer[];
	finalPrice: number;
}

const initialState: offersState = {
	favoriteOffers: [],
	cartOffers: [],
	finalPrice: 0,
};

export const offersSlice = createSlice({
	name: "offers",
	initialState,
	reducers: {
		updatePrice: (state) => {
			state.finalPrice = 0;
			const priceByProduct: number[] = state.cartOffers.map((offer) => {
				return offer.amount * offer.price;
			});
			priceByProduct.forEach((productPrice) => {
				state.finalPrice += productPrice;
			});
		},
		increaseCountOfProduct: (state, action: PayloadAction<number>) => {
			state.cartOffers.forEach((offer) => {
				if (offer.id === action.payload) offer.amount++;
			});
		},
		decreaseCountOfProduct: (state, action: PayloadAction<number>) => {
			state.cartOffers.forEach((offer) => {
				if (offer.id === action.payload) offer.amount--;
			});
		},
		// setProductAmount: (
		// 	state,
		// 	action: PayloadAction<{ id: number; amount: number }>
		// ) => {
		// 	state.products.forEach((product) => {
		// 		if (product.id === action.payload.id)
		// 			product.productCount = action.payload.amount;
		// 	});
		// },
		setFavoriteOffers: (state, action: PayloadAction<Offer[]>) => {
			state.favoriteOffers = action.payload;
		},
		setCartOffers: (state, action: PayloadAction<CartOffer[]>) => {
			state.cartOffers = action.payload;
		},

		addOfferToFavorites: (state, action: PayloadAction<Offer>) => {
			const newOffer = action.payload;
			let unique = true;
			state.favoriteOffers.forEach((offer) => {
				if (offer.id === newOffer.id) unique = false;
			});
			if (unique) state.favoriteOffers.push(newOffer);
		},

		addOfferToCart: (state, action: PayloadAction<CartOffer>) => {
			const newOffer = action.payload;
			let unique = true;
			state.cartOffers.forEach((offer) => {
				if (offer.id === newOffer.id) unique = false;
			});
			if (unique) state.cartOffers.push(newOffer);
		},

		deleteOfferFromFavorites: (state, action: PayloadAction<number>) => {
			const offerToDeleteID = action.payload;
			state.favoriteOffers = state.favoriteOffers.filter((offer) => {
				return offer.id !== offerToDeleteID;
			});
		},
		deleteOfferFromCart: (state, action: PayloadAction<number>) => {
			const offerToDeleteID = action.payload;
			state.cartOffers = state.cartOffers.filter((offer) => {
				return offer.id !== offerToDeleteID;
			});
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addOfferToFavorites,
	deleteOfferFromFavorites,
	deleteOfferFromCart,
	setFavoriteOffers,
	addOfferToCart,
	setCartOffers,
	increaseCountOfProduct,
	decreaseCountOfProduct,
	updatePrice,
} = offersSlice.actions;

export default offersSlice.reducer;
