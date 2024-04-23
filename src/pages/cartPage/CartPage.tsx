import React, { useEffect } from "react";
import CartScreen from "./cartScreen/CartScreen.tsx";
import OrderSummaryScreen from "./orderSummaryScreen/OrderSummaryScreen.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store.ts";
import "./cartPage.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import cartApi from "../../api/cartApi.ts";
import { setCartProducts } from "../../Redux/cartProductsSlice.ts";
import { setCartOffers } from "../../Redux/offerSlice.ts";

const CartPage = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const offers = useSelector((state: RootState) => state.offers.cartOffers);
	const axiosPrivate = useAxiosPrivate();

	const dispatch = useDispatch();

	useEffect(() => {
		const getOffers = async () => {
			try {
				const offers = await cartApi.getCartOffers(axiosPrivate);
				console.log(offers);
				dispatch(setCartOffers(offers));
			} catch (err) {
				console.log(err);
				dispatch(setCartOffers([]));
			}
		};
		if (authUser.name !== "") getOffers();
	}, []);

	const cartPage = (
		<div className="cartPageContainer">
			<div>
				<CartScreen offers={offers} />
			</div>
			<div>
				<OrderSummaryScreen />
			</div>
		</div>
	);
	return (
		<div className="container-md ">
			<div className="cartScreen_Header">
				<h3 className="cartScreen_Header_Text">Kosár</h3>
			</div>

			{offers.length === 0
				? "A kosarad üres. Termékek hozzáadásához, kérjük lépj vissza a webáruházba."
				: cartPage}
		</div>
	);
};

export default CartPage;
