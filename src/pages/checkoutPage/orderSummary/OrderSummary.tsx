import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartApi from "../../../api/cartApi.ts";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.ts";
import { Link } from "react-router-dom";
import { setCartOffers, updatePrice } from "../../../Redux/offerSlice.ts";
import { RootState } from "../../../Redux/store.ts";
import OrderSUmmaryProductCard from "../../../components/orderSummaryProductCard/OrderSummaryProductCard.tsx";
import "./orderSummary.css";

const OrderSummary = () => {
	const axiosPrivate = useAxiosPrivate();
	const offers = useSelector((state: RootState) => state.offers.cartOffers);
	const dispatch = useDispatch();
	const finalPrice = useSelector((state: RootState) => state.offers.finalPrice);
	const [hover, setHover] = useState(false);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const offers = await cartApi.getCartOffers(axiosPrivate);

				dispatch(setCartOffers(offers));
			} catch (err) {
				console.log(err);
			}
		};
		getProducts();
	}, []);

	useEffect(() => {
		dispatch(updatePrice());
	}, [offers]);

	const createProductCard = (offer, index) => {
		return (
			<>
				<div>{offer.name}</div>
				<OrderSUmmaryProductCard
					name={offer.product.name}
					amount={offer.amount}
					id={offer.id}
					price={offer.price}
					key={index}
				/>
			</>
		);
	};

	return (
		<div>
			<h2>Rendelés összegzése</h2>
			<div className="orderSummaryScreen__grid-container">
				<div>
					<div className="orderSummaryScreen__container">
						<div>GameShop Rendelés</div>
						<div>{offers.map(createProductCard)}</div>
					</div>
				</div>
				<div>
					<h2>Végösszeg: {finalPrice} Ft</h2>
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
		</div>
	);
};

export default OrderSummary;
