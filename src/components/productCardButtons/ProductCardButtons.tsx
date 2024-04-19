import React from "react";
import ProductCardButton from "../productCardButton/ProductCardButton.tsx";
import "./productCardButtons.css";
import { useDispatch, useSelector } from "react-redux";
import {
	addProductToCart,
	updatePrice,
} from "../../Redux/cartProductsSlice.ts";
import { addProductToFavorites } from "../../Redux/favoriteProductsSlice.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import favoritesApi from "../../api/favoritesApi.ts";
import { RootState } from "../../Redux/store.ts";
import cartApi from "../../api/cartApi.ts";

const ProductCardButtons = (props) => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const axiosPrivate = useAxiosPrivate();
	const dispatch = useDispatch();
	const { productData } = props;
	const icons = [
		<i className="bi bi-heart"></i>,
		<i className="bi bi-cart"></i>,
	];

	const handleCartButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(addProductToCart(productData));
			dispatch(updatePrice());
		} else {
			await cartApi.addCartLink(productData.id, axiosPrivate);
		}
	};
	const handleFavoriteButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(addProductToFavorites(productData));
		} else {
			await favoritesApi.addFavoritesLink(productData.id, axiosPrivate);
		}
	};

	return (
		<div className="productCard_ButtonsContainer">
			<div>
				<ProductCardButton
					handleClick={handleFavoriteButtonClick}
					icon={icons[0]}
				/>
			</div>
			<div>
				<span className="productCard_price">{productData.price}ft</span>
			</div>
			<div>
				<ProductCardButton
					handleClick={handleCartButtonClick}
					icon={icons[1]}
				/>
			</div>
		</div>
	);
};

export default ProductCardButtons;
