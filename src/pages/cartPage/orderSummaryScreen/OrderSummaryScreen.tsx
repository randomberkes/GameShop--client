import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../Redux/store';
import './orderSummaryScreen.css';

const OrderSummatyScreen = () => {
	const finalPrice = useSelector((state: RootState) => state.offers.finalPrice);
	const [hover, setHover] = useState(false);
	return (
		<div className="orderSummaryScreen_Container">
			<div className="row ">
				<h3>Rendelés összegzése</h3>
			</div>
			<div className="row ">
				<h4>Végösszeg:</h4>
			</div>
			<div className="row ">
				<h2>{finalPrice} Ft</h2>
			</div>

			<Link className="orderScreenButtonRow" to="/checkout">
				<button
					className={
						'orderScreenButton' +
						(hover ? ' orderSummaryScreen__button-hover' : '')
					}
					onMouseOver={() => {
						setHover(true);
					}}
					onMouseOut={() => {
						setHover(false);
					}}
				>
					Folytatás
				</button>
			</Link>
		</div>
	);
};

export default OrderSummatyScreen;
