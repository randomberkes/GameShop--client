import React from "react";
import { Product } from "../../../DTO/product";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import "./favoritesScreen.css";
import ProductCard from "../../../components/productCard/ProductCard.tsx";
import FavoriteProductCardButtons from "../../../components/favoriteProductCardButtons/FavoriteProductCardButtons.tsx";

const FavoritesScreen = () => {
	const { products } = useSelector(
		(state: RootState) => state.favoriteProducts
	);

	const createCard = (
		productData: Product,
		index: number
	): React.JSX.Element => {
		return (
			<ProductCard
				key={index}
				productData={productData}
				buttons={<FavoriteProductCardButtons productData={productData} />}
			/>
		);
	};

	return (
		<div className="">
			<div className="favoritesScreen_Header">
				<h3 className="favoritesScreen_Header_Text">Kedvencek</h3>
			</div>
			{products.length === 0
				? "Hmm, nincsen termék a listában."
				: products.map((product, index) => {
						return createCard(product, index);
				  })}
		</div>
	);
};

export default FavoritesScreen;
