import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addProductToCart,
	updatePrice,
} from "../../Redux/cartProductsSlice.ts";
import { deleteProductFromFavorites } from "../../Redux/favoriteProductsSlice.ts";
import ProductCardButton from "../productCardButton/ProductCardButton.tsx";
import { RootState } from "../../Redux/store.ts";
import favoritesApi from "../../api/favoritesApi.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import cartApi from "../../api/cartApi.ts";
import "./favoriteProductCardButtons.css";
import {
	addOfferToCart,
	deleteOfferFromFavorites,
} from "../../Redux/offerSlice.ts";

const FavoriteProductCardButtons = (props) => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const axiosPrivate = useAxiosPrivate();
	const { productData, price, offerID, name } = props;
	const icons = [
		<i className="bi bi-cart"></i>,
		<i className="bi bi-trash3"></i>,
	];

	const handleDeleteButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(deleteOfferFromFavorites(offerID));
		} else {
			await favoritesApi.deleteFavoritesLink(offerID, axiosPrivate);
			dispatch(deleteOfferFromFavorites(offerID));
		}
	};
	const handleCartButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(
				addOfferToCart({
					id: offerID,
					name: name,
					price: price,
					product: productData,
					amount: 1,
				})
			);
		} else {
			await cartApi.addCartLink(offerID, axiosPrivate);
		}
	};

	return (
		<div className="favoriteProductCardButtons_Container">
			<div>
				<ProductCardButton
					handleClick={handleCartButtonClick}
					icon={icons[0]}
				/>
			</div>
			<div>
				<span className="favoriteProductCardButtons_price">{price}ft</span>
			</div>
			<div>
				<ProductCardButton
					handleClick={handleDeleteButtonClick}
					icon={icons[1]}
				/>
			</div>
		</div>
	);
};

export default FavoriteProductCardButtons;
