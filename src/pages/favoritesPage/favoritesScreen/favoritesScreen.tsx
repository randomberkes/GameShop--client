import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteOffers } from "../../../Redux/offerSlice.ts";
import { RootState } from "../../../Redux/store.ts";
import favoritesApi from "../../../api/favoritesApi.ts";
import ProductCardHeader from "../../../components/productCardHeader/ProductCardHeader.tsx";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.ts";
import "./favoritesScreen.css";

const FavoritesScreen = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);

	const offers = useSelector((state: RootState) => state.offers.favoriteOffers);

	const dispatch = useDispatch();
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
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
