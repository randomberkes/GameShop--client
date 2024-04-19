import React, { useEffect } from "react";
import cartApi from "../../api/cartApi.ts";
import {
	setProductAmount,
	updatePrice,
} from "../../Redux/cartProductsSlice.ts";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import "./orderSummaryProductCard.css";

const OrderSUmmaryProductCard = (props) => {
	const axiosPrivate = useAxiosPrivate();
	const dispatch = useDispatch();
	const { name, id, amount, price } = props;
	useEffect(() => {
		const updateAmount = async () => {
			const rows = await cartApi.getAmountOfCartProduct(id, axiosPrivate);

			const input = { id: id, amount: rows?.amount };
			dispatch(setProductAmount(input));
			dispatch(updatePrice());
		};
		updateAmount();
	}, [amount]);
	return (
		<div>
			<div className="orderSummaryProductCard__container">
				<div>{amount + "x"}</div>
				<div>{name}</div>
				<div>{(price * amount).toFixed(3)}</div>
			</div>
		</div>
	);
};

export default OrderSUmmaryProductCard;
