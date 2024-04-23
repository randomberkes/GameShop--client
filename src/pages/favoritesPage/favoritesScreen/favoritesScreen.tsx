import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import "./favoritesScreen.css";
import {
	addProductToFavorites,
	setFavoriteProducts,
} from "../../../Redux/favoriteProductsSlice.ts";
import ProductCardHeader from "../../../components/productCardHeader/ProductCardHeader.tsx";
import { setFavoriteOffers } from "../../../Redux/offerSlice.ts";
import favoritesApi from "../../../api/favoritesApi.ts";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.ts";
import productsApi from "../../../api/productsApi.ts";

const FavoritesScreen = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);

	const offers = useSelector((state: RootState) => state.offers.favoriteOffers);

	const dispatch = useDispatch();
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		console.log(offers);
		const getOffers = async () => {
			try {
				const offers = await favoritesApi.getFavoriteOffers(axiosPrivate);

				dispatch(setFavoriteOffers(offers));
			} catch (err) {
				console.log(err);
				dispatch(setFavoriteOffers([]));
			}
		};
		if (authUser.name !== "") getOffers();
	}, []);

	const createCard = (offer, index: number) => {
		console.log(offer.product);
		return (
			<ProductCardHeader
				key={index}
				seller={offer.name}
				product={offer.product}
				index={index}
				price={offer.price}
				offerID={offer.id}
			/>
		);
	};

	return (
		<div className="">
			<div className="favoritesScreen_Header">
				<h3 className="favoritesScreen_Header_Text">Kedvencek</h3>
			</div>
			{offers.length === 0
				? "Hmm, nincsen termék a listában."
				: offers.map(createCard)}
		</div>
	);
};

export default FavoritesScreen;
