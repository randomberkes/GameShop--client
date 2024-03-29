import React from "react";
import FavoriteProductCard from "./favoriteProductCard/FavoriteProductCard.tsx";
import { Product } from "../../../DTO/product";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";

const FavoritesScreen = () => {
	const { products } = useSelector(
		(state: RootState) => state.favoriteProducts
	);

	const createCard = (
		productData: Product,
		index: number
	): React.JSX.Element => {
		return <FavoriteProductCard key={index} productData={productData} />;
	};

	return (
		<div className="container-md">
			{products.map((product, index) => {
				return createCard(product, index);
			})}
		</div>
	);
};

export default FavoritesScreen;
