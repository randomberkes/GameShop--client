import React from "react";
import CartProductCard from "./cartProductCard/CartProductCard.tsx";
import { Product } from "../../../DTO/product.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";

const CartScreen = () => {
	const { products } = useSelector((state: RootState) => state.cartProducts);

	const createCard = (
		productData: Product,
		index: number
	): React.JSX.Element => {
		return <CartProductCard key={index} productData={productData} />;
	};

	return (
		<div className="container-md">
			{products.map((product, index) => {
				return createCard(product, index);
			})}
			;
		</div>
	);
};

export default CartScreen;
