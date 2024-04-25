import React from "react";
import ProductCard from "../productCard/ProductCard.tsx";
import FavoriteProductCardButtons from "../favoriteProductCardButtons/FavoriteProductCardButtons.tsx";
import { useLocation } from "react-router-dom";
import CartProductCardButtons from "../cartProductCardButtons/CartProductCardButtons.tsx";

const ProductCardHeader = (props) => {
	const { seller, product, index, price, offerID, amount } = props;
	const location = useLocation();

	return (
		<div>
			<div>{seller}</div>
			<ProductCard
				key={index}
				productData={product}
				buttons={
					location.pathname === "/favorites" ? (
						<FavoriteProductCardButtons
							productData={product}
							offerID={offerID}
							price={price}
							name={seller}
						/>
					) : (
						<CartProductCardButtons
							productData={product}
							offerID={offerID}
							price={price}
							amount={amount}
						/>
					)
				}
			/>
		</div>
	);
};

export default ProductCardHeader;