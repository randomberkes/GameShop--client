import React, { useContext, useEffect } from "react";
import "./productsScreen.css";
import ProductCard from "./productCard/ProductCard.tsx";
import { Product } from "../../DTO/product.ts";
import { MyContext } from "../../Context.ts";
import productsApi from "../../api/productsApi.ts";

function ProductsScreen() {
	const { productsContext } = useContext(MyContext);
	const { products, setProducts } = productsContext;

	useEffect(() => {
		getAllProducts();
	}, []);

	const getAllProducts = async () => {
		const productListData = await productsApi.getAllProducts();
		setProducts(productListData);
	};

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
