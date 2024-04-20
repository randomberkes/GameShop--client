import React, { useEffect, useState } from "react";
import cartApi from "../../../api/cartApi.ts";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.ts";
import { useDispatch, useSelector } from "react-redux";
import { setCartProducts } from "../../../Redux/cartProductsSlice.ts";
import { RootState } from "../../../Redux/store.ts";
import "./orderSummary.css";
import OrderSUmmaryProductCard from "../../../components/orderSummaryProductCard/OrderSummaryProductCard.tsx";
import { Link, Navigate, useLocation } from "react-router-dom";

const OrderSummary = () => {
	const axiosPrivate = useAxiosPrivate();
	const dispatch = useDispatch();
	const { products, finalPrice } = useSelector(
		(state: RootState) => state.cartProducts
	);

	const [hover, setHover] = useState(false);
	useEffect(() => {
		const getProducts = async () => {
			try {
				const products = await cartApi.getCartProducts(axiosPrivate);
				dispatch(setCartProducts(products));
			} catch (err) {
				console.log(err);
				dispatch(setCartProducts([]));
			}
		};
		getProducts();
	}, []);

	const createProductCard = (product, index) => {
		return (
			<OrderSUmmaryProductCard
				name={product.name}
				amount={product.productCount}
				id={product.id}
				price={product.price}
				key={index}
			/>
		);
	};

	return (
		<div className="orderSummaryScreen__grid-container">
			<div>
				<div className="orderSummaryScreen__container">
					<div>GameShop Rendelés</div>
					<div>{products.map(createProductCard)}</div>
				</div>
			</div>
			<div>
				<h2>Végösszeg: {finalPrice.toFixed(3)}</h2>
			</div>
			<div>
				<Link
					to="/payment"
					className={
						"orderSummaryScreen__button" +
						(hover ? " orderSummaryScreen__button_hover" : "")
					}
					onMouseOver={() => {
						setHover(true);
					}}
					onMouseOut={() => {
						setHover(false);
					}}
				>
					Tovább
				</Link>
			</div>
		</div>
	);
};

export default OrderSummary;
