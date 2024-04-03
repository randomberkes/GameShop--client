import React, { useContext, useEffect } from "react";
import "./productsScreen.css";
import ProductCard from "./productCard/ProductCard.tsx";
import { Product } from "../../../DTO/product.ts";
// import { MyContext } from "../../Context.ts";
import productsApi from "../../../api/productsApi.ts";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../Redux/productsSlice.ts";
import { RootState } from "../../../Redux/store.ts";

function ProductsScreen() {
	const { products } = useSelector((state: RootState) => state.products);
	const dispatch = useDispatch();
	const { filter } = useSelector((state: RootState) => state.products);

	const getProductsByFilter = async () => {
		const productListData = await productsApi.getProductsByFilter(filter);
		dispatch(setProducts(productListData));
		console.log("Filter");
		console.log(filter);
	};

	useEffect(() => {
		getProductsByFilter();
	}, [filter]);

	const getAllProducts = async () => {
		const productListData = await productsApi.getAllProducts();
		dispatch(setProducts(productListData));
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
