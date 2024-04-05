import React from "react";
import ProductCard from "../../../components/productCard/ProductCard.tsx";
import "./cartScreen.css";
import { CartProduct } from "../../../Redux/cartProductsSlice.ts";
import CartProductCardButtons from "../../../components/cartProductCardButtons/CartProductCardButtons.tsx";

const CartScreen = (props) => {
	const { products } = props;
	const createCard = (productData: CartProduct): React.JSX.Element => {
		return (
			<ProductCard
				key={productData.id}
				id={productData.id}
				productData={productData}
				buttons={<CartProductCardButtons productData={productData} />}
			/>
		);
	};

	return products.map((product) => {
		return createCard(product);
	});
};

export default CartScreen;
