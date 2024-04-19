import React, { useEffect } from "react";
import { Product } from "../../../DTO/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import "./favoritesScreen.css";
import ProductCard from "../../../components/productCard/ProductCard.tsx";
import FavoriteProductCardButtons from "../../../components/favoriteProductCardButtons/FavoriteProductCardButtons.tsx";
import useLogedInUser from "../../../hooks/useLogedInUser.ts";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.ts";
import favoritesApi from "../../../api/favoritesApi.ts";
import { setFavoriteProducts } from "../../../Redux/favoriteProductsSlice.ts";

const FavoritesScreen = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const axiosPrivate = useAxiosPrivate();
	const { products } = useSelector(
		(state: RootState) => state.favoriteProducts
	);

	const dispatch = useDispatch();

	useEffect(() => {
		const getProducts = async () => {
			try {
				const products = await favoritesApi.getFavoriteProducts(axiosPrivate);
				console.log(products);
				dispatch(setFavoriteProducts(products));
			} catch (err) {
				console.log(err);
				dispatch(setFavoriteProducts([]));
			}
		};
		if (authUser.name !== "") getProducts();
	}, []);

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
