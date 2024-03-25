import React, { useEffect, useState } from "react";
import "./productsScreen.css";
import ProductCard from "./productCard/ProductCard.tsx";
import axios from "axios";
import { Product } from "../../DTO/product.ts";

function ProductsScreen() {
	const [productListData, setProductListData] = useState<Product[]>([]);

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
			setProductListData(productListData);
		});
	}, []);

	const createCard = (
		productData: Product,
		index: number
	): React.JSX.Element => {
		return <ProductCard key={index} productData={productData} />;
	};

	return (
		<div className="container-fluid productsScreen">
			<div className="row">
				<div className="col-3"></div>
				{productListData.map((product, index) => {
					return createCard(product, index);
				})}
			</div>
		</div>
	);
}

export default ProductsScreen;
