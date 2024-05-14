import React from "react";
import "./orderSummaryProductCard.css";

const OrderSUmmaryProductCard = (props) => {
	const { name, id, amount, price } = props;
	return (
		<div className="orderSummaryProductCard__container">
			<div>{amount + "x"}</div>
			<div>{name}</div>
			<div>{price * amount} Ft</div>
		</div>
	);
};

export default OrderSUmmaryProductCard;
