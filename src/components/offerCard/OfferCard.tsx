import React, { useEffect, useState } from "react";
import "./offerCard.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { addOfferToCart, addOfferToFavorites } from "../../Redux/offerSlice.ts";
import favoritesApi from "../../api/favoritesApi.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import { addProductToCart } from "../../Redux/cartProductsSlice.ts";
import cartApi from "../../api/cartApi.ts";

const OfferCard = (props) => {
	const { id, name, price, product } = props;
	const [hoverCartButton, setHoverCartButton] = useState(false);
	const [hoverFavoritesButton, setHoverFavoritesButton] = useState(false);
	const dispatch = useDispatch();
	const { authUser } = useSelector((state: RootState) => state.auth);
	const axiosPrivate = useAxiosPrivate();
	const offers = useSelector((state: RootState) => state.offers.favoriteOffers);

	useEffect(() => {
		console.log(offers);
		console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIi");
	}, [offers]);

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
		}
	};

	const handleCartButtonClick = async () => {
		console.log(product);
		if (authUser.name === "") {
			dispatch(
				addOfferToCart({
					id: id,
					name: name,
					price: price,
					product: product,
				})
			);
		} else {
			await cartApi.addCartLink(id, axiosPrivate);
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
