import React from "react";
import CartProductCard from "./cartProductCard/CartProductCard.tsx";
import { Product } from "../../../DTO/product.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import "./cartScreen.css";

const CartScreen = () => {
	const { products } = useSelector((state: RootState) => state.cartProducts);

	const createCard = (
		productData: Product,
		index: number
	): React.JSX.Element => {
		return <CartProductCard key={index} productData={productData} />;
	};

	return (
		<div className="container-md ">
			<div className="row cartScreenLabel align-items-center">
				<div className="col-4">
					<h3>Kosár</h3>
				</div>
			</div>
			{products.length == 0
				? "A kosarad üres. Termékek hozzáadásához, kérjük lépj vissza a webáruházba."
				: products.map((product, index) => {
						return createCard(product, index);
				  })}
		</div>
	);
};

export default CartScreen;
