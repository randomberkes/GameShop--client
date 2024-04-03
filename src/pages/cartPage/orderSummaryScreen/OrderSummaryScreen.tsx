import React from "react";
import "./orderSummaryScreen.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

const OrderSummatyScreen = () => {
	const { finalPrice } = useSelector((state: RootState) => state.cartProducts);
	return (
		<div className="orderSummaryScreen container-fluid">
			<div className="row ">
				<div className="col">
					<h3>Rendelés összegzése</h3>
				</div>
			</div>
			<div className="row ">
				<div className="col">
					<h4>Végösszeg:</h4>
				</div>
			</div>
			<div className="row ">
				<div className="col">
					<h2>{finalPrice.toFixed(3)} Ft</h2>
				</div>
			</div>
			<div className="row ">
				<div className="col text-center orderScreenButtonRow">
					<button className="orderScreenButton">Folytatás</button>
				</div>
			</div>
		</div>
	);
};

export default OrderSummatyScreen;
