import React from "react";
import { useDispatch } from "react-redux";
import {
	decreaseCountOfProduct,
	deleteProductFromCart,
	increaseCountOfProduct,
	updatePrice,
} from "../../Redux/cartProductsSlice.ts";
import ProductCardButton from "../productCardButton/ProductCardButton.tsx";
import "./cartProductCardButtons.css";

const CartProductCardButtons = (props) => {
	const dispatch = useDispatch();
	const { productData } = props;
	const icons = [<i className="bi bi-trash3"></i>];

	const handleDeleteButtonClick = () => {
		dispatch(deleteProductFromCart(productData.id));
	};

	const handlePlusButtonClick = () => {
		dispatch(increaseCountOfProduct(productData.id));
		dispatch(updatePrice());
	};
	const handleMinusButtonClick = () => {
		dispatch(decreaseCountOfProduct(productData.id));
		dispatch(updatePrice());
	};

	return (
		<div className="productCard_ButtonsContainer">
			<div>
				<span className="productCard_price">{productData.price}ft</span>
			</div>
			<div>
				<button
					className="plusMinusButton"
					disabled={productData.productCount === 1}
					onClick={handleMinusButtonClick}
				>
					<i className="bi bi-dash plusMinusIcon"></i>
				</button>
				<span>{productData.productCount}</span>
				<button className="plusMinusButton" onClick={handlePlusButtonClick}>
					<i className="bi bi-plus plusMinusIcon"></i>
				</button>
			</div>

			<div>
				<ProductCardButton
					handleClick={handleDeleteButtonClick}
					icon={icons[0]}
				/>
			</div>
		</div>
	);
};

export default CartProductCardButtons;
