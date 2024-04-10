import React from "react";
import { useDispatch } from "react-redux";
import {
	addProductToCart,
	updatePrice,
} from "../../Redux/cartProductsSlice.ts";
import { deleteProductFromFavorites } from "../../Redux/favoriteProductsSlice.ts";
import ProductCardButton from "../productCardButton/ProductCardButton.tsx";

const FavoriteProductCardButtons = (props) => {
	const dispatch = useDispatch();
	const { productData } = props;
	const icons = [
		<i className="bi bi-cart"></i>,
		<i className="bi bi-trash3"></i>,
	];

	const handleDeleteButtonClick = () => {
		dispatch(deleteProductFromFavorites(productData.id));
	};
	const handleCartButtonClick = () => {
		dispatch(addProductToCart(productData));
		dispatch(updatePrice());
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
