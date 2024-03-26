import React, { useContext, useEffect, useState } from "react";
import "./productsScreen.css";
import ProductCard from "./productCard/ProductCard.tsx";
import { Product } from "../../DTO/product.ts";
import { ProductsContext } from "../../Context.ts";
import axios from "axios";

function ProductsScreen() {
	const { products, setProducts } = useContext(ProductsContext);

	useEffect(() => {
		axios.get("/products").then((response) => {
			const productListData = response.data.map((data) => {
				return {
					id: data,
					name: data.name,
					platform: data.platform,
					gameDeviceCompatibility: data.game_device_compatibility,
					gameType: data.game_type,
					ratingPegi: data.rating_pegi,
					numberOfPlayers: data.number_of_players,
					descriptions: data.description,
					price: data.price,
				};
			});
			setProducts(productListData);
		});
	}, []);

	const createCard = (
		productData: Product,
		index: number
	): React.JSX.Element => {
		return <ProductCard key={index} productData={productData} />;
	};

	return products.map((product, index) => {
		return createCard(product, index);
	});
}

export default ProductsScreen;
