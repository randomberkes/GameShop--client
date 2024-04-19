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

const FavoriteProductCardButtons = (props) => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const axiosPrivate = useAxiosPrivate();
	const { productData } = props;
	const icons = [
		<i className="bi bi-cart"></i>,
		<i className="bi bi-trash3"></i>,
	];

	const handleDeleteButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(deleteProductFromFavorites(productData.id));
		} else {
			dispatch(deleteProductFromFavorites(productData.id));
			await favoritesApi.deleteFavoritesLink(productData.id, axiosPrivate);
		}
	};
	const handleCartButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(addProductToCart(productData));
			dispatch(updatePrice());
		} else {
			await cartApi.addCartLink(productData.id, axiosPrivate);
		}
	};

	return (
		<div className="productCard_ButtonsContainer">
			<div>
				<ProductCardButton
					handleClick={handleCartButtonClick}
					icon={icons[0]}
				/>
			</div>
			<div>
				<span className="productCard_price">{productData.price}ft</span>
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
