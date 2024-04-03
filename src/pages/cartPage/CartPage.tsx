import React from "react";
import CartScreen from "./cartScreen/CartScreen.tsx";
import OrderSummaryScreen from "./orderSummaryScreen/OrderSummaryScreen.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store.ts";

const CartPage = () => {
	const { products } = useSelector((state: RootState) => state.cartProducts);
	const cartPage = (
		<div className="row">
			<div className=" col-12 col-lg-9 container-fluid ">
				<CartScreen products={products} />
			</div>
			<div className="col-12 col-lg-3 container-fluid ">
				<OrderSummaryScreen />
			</div>
		</div>
	);
	return (
		<div className="container-md ">
			<div className="row cartScreenLabel align-items-center ">
				<div className="col-4">
					<h3>Kosár</h3>
				</div>
			</div>
			{products.length === 0
				? "A kosarad üres. Termékek hozzáadásához, kérjük lépj vissza a webáruházba."
				: cartPage}
		</div>
	);
};

export default CartPage;
