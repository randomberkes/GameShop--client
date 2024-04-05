import React from "react";
import ProductCardButton from "../productCardButton/ProductCardButton.tsx";
import "./productCardButtons.css";
import { useDispatch } from "react-redux";
import {
	addProductToCart,
	updatePrice,
} from "../../Redux/cartProductsSlice.ts";
import { addProductToFavorites } from "../../Redux/favoriteProductsSlice.ts";

const ProductCardButtons = (props) => {
	const dispatch = useDispatch();
	const { productData } = props;
	const icons = [
		<i className="bi bi-heart"></i>,
		<i className="bi bi-cart"></i>,
	];

	const handleCartButtonClick = () => {
		dispatch(addProductToCart(productData));
		dispatch(updatePrice());
	};
	const handleFavoriteButtonClick = () => {
		dispatch(addProductToFavorites(productData));
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
