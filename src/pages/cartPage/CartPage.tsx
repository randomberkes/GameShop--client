import React from "react";
import CartScreen from "./cartScreen/CartScreen.tsx";
import OrderSummaryScreen from "./orderSummaryScreen/OrderSummaryScreen.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store.ts";
import "./cartPage.css";

const CartPage = () => {
	const { products } = useSelector((state: RootState) => state.cartProducts);

	const cartPage = (
		<div className="cartPageContainer">
			<div>
				<CartScreen products={products} />
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

			{products.length === 0
				? "A kosarad üres. Termékek hozzáadásához, kérjük lépj vissza a webáruházba."
				: cartPage}
		</div>
	);
};

export default CartPage;
