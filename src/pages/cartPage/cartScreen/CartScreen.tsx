import React from "react";
import CartProductCard from "./cartProductCard/CartProductCard.tsx";
import { Product } from "../../../DTO/product.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import "./cartScreen.css";
import { CartProduct } from "../../../Redux/cartProductsSlice.ts";

const CartScreen = (props) => {
	const { products } = props;
	const createCard = (productData: CartProduct): React.JSX.Element => {
		return (
			<CartProductCard
				key={productData.id}
				id={productData.id}
				productData={productData}
				productsCount={productData.productCount}
			/>
		);
	};

	return products.map((product) => {
		return createCard(product);
	});
};

export default CartScreen;
