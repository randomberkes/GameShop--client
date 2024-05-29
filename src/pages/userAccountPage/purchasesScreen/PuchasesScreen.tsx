import React, { useEffect, useState } from 'react';
import orderApi from '../../../api/orderApi.ts';
import OrderCard from '../../../components/orderCard/OrderCard.tsx';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.ts';
import './puchasesScreen.css';

const PuchasesScreen = () => {
	const [orderIDs, setOrderIDs] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	useEffect(() => {
		const getUserIDs = async () => {
			const orderIDs = await orderApi.getOrdersIDs(axiosPrivate);
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
				<h2>Vásárlások</h2>
			</div>

			{orderIDs.map(createOrderCard)}
		</>
	);
};

export default PuchasesScreen;
