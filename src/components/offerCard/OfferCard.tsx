import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOfferToCart, addOfferToFavorites } from "../../Redux/offerSlice.ts";
import { RootState } from "../../Redux/store";
import cartApi from "../../api/cartApi.ts";
import favoritesApi from "../../api/favoritesApi.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import "./offerCard.css";

const OfferCard = (props) => {
	const { id, name, price, product } = props;
	const [hoverCartButton, setHoverCartButton] = useState(false);
	const [hoverFavoritesButton, setHoverFavoritesButton] = useState(false);
	const dispatch = useDispatch();
	const { authUser } = useSelector((state: RootState) => state.auth);
	const axiosPrivate = useAxiosPrivate();

	const handleFavoriteButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(
				addOfferToFavorites({
					id: id,
					name: name,
					price: price,
					product: product,
				})
			);
		} else {
			await favoritesApi.addFavoritesLink(id, axiosPrivate);
			dispatch(
				addOfferToFavorites({
					id: id,
					name: name,
					price: price,
					product: product,
				})
			);
		}
	};

	const handleCartButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(
				addOfferToCart({
					id: id,
					name: name,
					price: price,
					product: product,
					amount: 1,
				})
			);
		} else {
			await cartApi.addCartLink(id, axiosPrivate);
			dispatch(
				addOfferToCart({
					id: id,
					name: name,
					price: price,
					product: product,
					amount: 1,
				})
			);
		}
	};

	return (
		<div className="offerCard__container">
			<div className="offerCard__icon-name-container">
				<div className="offerCard__user-icon">
					<p>{name.length > 0 ? name[0].toUpperCase() : ""}</p>
				</div>

				<p>{name}</p>
			</div>
			<div className="offerCard__price-button-container">
				<p>{price + " ft"}</p>

				<button
					onClick={handleCartButtonClick}
					className={hoverCartButton ? " hover" : ""}
					onMouseOver={() => {
						setHoverCartButton(true);
					}}
					onMouseOut={() => {
						setHoverCartButton(false);
					}}
				>
					<i className="bi bi-cart-fill"></i>
				</button>
				<button
					onClick={handleFavoriteButtonClick}
					className={hoverFavoritesButton ? " hover" : ""}
					onMouseOver={() => {
						setHoverFavoritesButton(true);
					}}
					onMouseOut={() => {
						setHoverFavoritesButton(false);
					}}
				>
					<i className="bi bi-heart-pulse-fill"></i>
				</button>
			</div>
		</div>
	);
};

export default OfferCard;
