import React, { useEffect, useState } from "react";
import "./orderCard.css";
import orderApi from "../../api/orderApi.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import OrderItemCard from "../orderItemCard/OrderItemCard.tsx";

const OrderCard = (props) => {
	const [orderItems, setOrderItems] = useState([]);
	const { orderID, price } = props;
	const axiosPrivate = useAxiosPrivate();
	useEffect(() => {
		const getOrderItems = async () => {
			const orderIDs = await orderApi.getOrdersItems(orderID, axiosPrivate);
			setOrderItems(orderIDs);
		};
		getOrderItems();
	}, []);

	const createOrderItemCard = (orderItem) => {
		return (
			<OrderItemCard
				name={orderItem.name}
				amount={orderItem.amount}
				price={orderItem.price}
				productID={orderItem.productID}
			/>
		);
	};

	return (
		<div className="orderCard-container">
			<div className="orderCard-container-header">
				<p>Vásárlás száma: {orderID}</p>
				<p>Végösszeg: {price} Ft</p>
			</div>
			<div>{orderItems.map(createOrderItemCard)}</div>
		</div>
	);
};

export default OrderCard;
