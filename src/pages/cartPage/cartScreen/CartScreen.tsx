import React from "react";
import CartProductCard from "./cartProductCard/CartProductCard.tsx";
import { Product } from "../../../DTO/product.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import "./cartScreen.css";
import { CartProduct } from "../../../Redux/cartProductsSlice.ts";

const CartScreen = () => {
	const { products } = useSelector((state: RootState) => state.cartProducts);

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

	return (
		<div className="container-md ">
			<div className="row cartScreenLabel align-items-center">
				<div className="col-4">
					<h3>Kosár</h3>
				</div>
			</div>
			{products.length == 0
				? "A kosarad üres. Termékek hozzáadásához, kérjük lépj vissza a webáruházba."
				: products.map((product) => {
						return createCard(product);
				  })}
		</div>
	);
};

export default CartScreen;
