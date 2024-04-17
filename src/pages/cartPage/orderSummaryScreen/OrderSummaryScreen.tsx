import React from "react";
import "./orderSummaryScreen.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { Link, useLocation } from "react-router-dom";

const OrderSummatyScreen = () => {
	const { finalPrice } = useSelector((state: RootState) => state.cartProducts);
	const location = useLocation();
	return (
		<div className="orderSummaryScreen_Container">
			<div className="row ">
				<h3>Rendelés összegzése</h3>
			</div>
			<div className="row ">
				<h4>Végösszeg:</h4>
			</div>
			<div className="row ">
				<h2>{finalPrice.toFixed(3)} Ft</h2>
			</div>

			<Link
				className="orderScreenButtonRow"
				to="/checkout"
				state={{ from: location }}
				replace
			>
				<button className="orderScreenButton">Folytatás</button>
			</Link>
		</div>
	);
};

export default OrderSummatyScreen;
