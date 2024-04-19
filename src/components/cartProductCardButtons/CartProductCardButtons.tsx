import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	decreaseCountOfProduct,
	deleteProductFromCart,
	increaseCountOfProduct,
	setProductAmount,
	updatePrice,
} from "../../Redux/cartProductsSlice.ts";
import ProductCardButton from "../productCardButton/ProductCardButton.tsx";
import "./cartProductCardButtons.css";
import { RootState } from "../../Redux/store.ts";
import cartApi from "../../api/cartApi.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";

const CartProductCardButtons = (props) => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const { productData } = props;
	const axiosPrivate = useAxiosPrivate();
	const icons = [<i className="bi bi-trash3"></i>];

	useEffect(() => {
		const updateAmount = async () => {
			const rows = await cartApi.getAmountOfCartProduct(
				productData.id,
				axiosPrivate
			);

			const input = { id: productData.id, amount: rows.amount };
			dispatch(setProductAmount(input));
			dispatch(updatePrice());
		};
		if (authUser.name !== "") updateAmount();
	}, [productData]);

	const handleDeleteButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(deleteProductFromCart(productData.id));
			dispatch(updatePrice());
		} else {
			dispatch(deleteProductFromCart(productData.id));
			await cartApi.deleteCartLink(productData.id, axiosPrivate);
			dispatch(updatePrice());
		}
	};

	const handlePlusButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(increaseCountOfProduct(productData.id));
			dispatch(updatePrice());
		} else {
			await cartApi.incrementCartProductAmount(productData.id, axiosPrivate);
			const rows = await cartApi.getAmountOfCartProduct(
				productData.id,
				axiosPrivate
			);

			const input = { id: productData.id, amount: rows?.amount };
			dispatch(setProductAmount(input));
		}
	};
	const handleMinusButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(decreaseCountOfProduct(productData.id));
			dispatch(updatePrice());
		} else {
			await cartApi.decrementCartProductAmount(productData.id, axiosPrivate);
			const rows = await cartApi.getAmountOfCartProduct(
				productData.id,
				axiosPrivate
			);

			const input = { id: productData.id, amount: rows.amount };
			dispatch(setProductAmount(input));
		}
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
