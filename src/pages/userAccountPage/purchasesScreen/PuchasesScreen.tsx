import React, { useEffect, useState } from "react";
import "./puchasesScreen.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.ts";
import orderApi from "../../../api/orderApi.ts";
import OrderCard from "../../../components/orderCard/OrderCard.tsx";

const PuchasesScreen = () => {
	const [orderIDs, setOrderIDs] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	useEffect(() => {
		const getUserIDs = async () => {
			const orderIDs = await orderApi.getOrdersIDs(axiosPrivate);
			console.log(orderIDs);
			setOrderIDs(orderIDs);
		};
		getUserIDs();
	}, []);

	const createOrderCard = (orderID) => {
		return <OrderCard orderID={orderID.id} price={orderID.price} />;
	};
	return (
		<>
			<div className="puchasesScreen__header-container">
				<h2>Rendelések</h2>
			</div>
			{orderIDs.map(createOrderCard)}
		</>
	);
};

export default PuchasesScreen;
