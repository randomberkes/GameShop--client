import React from "react";
import "./cartScreen.css";
import ProductCardHeader from "../../../components/productCardHeader/ProductCardHeader.tsx";

const CartScreen = (props) => {
	const { offers } = props;
	const createCard = (offer, index: number): React.JSX.Element => {
		return (
			<ProductCardHeader
				seller={offer.name}
				product={offer.product}
				index={index}
				price={offer.price}
				offerID={offer.id}
			/>
		);
	};

	return offers.map(createCard);
};

export default CartScreen;
