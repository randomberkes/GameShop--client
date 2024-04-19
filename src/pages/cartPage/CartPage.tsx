import React, { useEffect } from "react";
import CartScreen from "./cartScreen/CartScreen.tsx";
import OrderSummaryScreen from "./orderSummaryScreen/OrderSummaryScreen.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store.ts";
import "./cartPage.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import cartApi from "../../api/cartApi.ts";
import { setCartProducts } from "../../Redux/cartProductsSlice.ts";

const CartPage = () => {
	const { products } = useSelector((state: RootState) => state.cartProducts);

	const { authUser } = useSelector((state: RootState) => state.auth);
	const axiosPrivate = useAxiosPrivate();

	const dispatch = useDispatch();

	useEffect(() => {
		const getProducts = async () => {
			try {
				const products = await cartApi.getCartProducts(axiosPrivate);
				console.log(products);
				dispatch(setCartProducts(products));
			} catch (err) {
				console.log(err);
				dispatch(setCartProducts([]));
			}
		};
		if (authUser.name !== "") getProducts();
	}, []);

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
