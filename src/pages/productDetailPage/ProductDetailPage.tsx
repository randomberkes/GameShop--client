/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsApi from "../../api/productsApi.ts";
import { Product } from "../../DTO/product.ts";
import "./productDetailPage.css";
import offerApi from "../../api/offerApi.ts";
import OfferCard from "../../components/offerCard/OfferCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store.ts";
import {
	addProductToCart,
	updatePrice,
} from "../../Redux/cartProductsSlice.ts";
import cartApi from "../../api/cartApi.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import { addProductToFavorites } from "../../Redux/favoriteProductsSlice.ts";
import favoritesApi from "../../api/favoritesApi.ts";
import { addOfferToCart, addOfferToFavorites } from "../../Redux/offerSlice.ts";

const ProductDetailPage = () => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const axiosPrivate = useAxiosPrivate();
	const [product, setProduct] = useState<Product>({
		id: 0,
		name: "",
		platform: "",
		gameDeviceCompatibility: "",
		gameType: "",
		ratingPegi: "",
		numberOfPlayers: "",
		descriptions: "",
		price: 0,
		imgPath: "",
	});
	const [offers, seOffers] = useState([{ name: "", price: 0, id: 0 }]);
	const { productID } = useParams();
	useEffect(() => {
		const getProduct = async () => {
			const product = await productsApi.getProductByID(productID);
			console.log(product);
			if (product) setProduct(product);
			console.log(product);
		};
		const getOffers = async () => {
			const offers = await offerApi.getOffers(productID);
			seOffers(offers);
			console.log(offers);
		};
		getOffers();
		getProduct();
	}, []);

	const handleCartButtonClick = async () => {
		if (authUser.name === "") {
			dispatch(
				addOfferToCart({
					id: offers[0].id,
					name: offers[0].name,
					price: offers[0].price,
					product: product,
				})
			);
		} else {
			await cartApi.addCartLink(offers[0].id, axiosPrivate);
		}
	};

	const handleFavoriteButtonClick = async () => {
		if (authUser.name === "") {
			console.log(product);
			dispatch(
				addOfferToFavorites({
					id: offers[0].id,
					name: offers[0].name,
					price: offers[0].price,
					product: product,
				})
			);
		} else {
			await favoritesApi.addFavoritesLink(offers[0].id, axiosPrivate);
		}
	};

	const crateOfferCard = (offer, index) => {
		return (
			<OfferCard
				key={index}
				id={offer.id}
				product={product}
				name={offer.name}
				price={offer.price}
			/>
		);
	};

	return (
		<div>
			<div className="productDetailPage__container">
				<div>
					<img
						className="productCard_mainImg"
						src={process.env.PUBLIC_URL + product.imgPath}
					/>
				</div>
				<div>
					<div>
						<p>{product.name}</p>
						<p>{product.platform}</p>
						<p>{product.gameDeviceCompatibility}</p>
						<p>{product.gameType}</p>
						<p>{product.ratingPegi}</p>
						<p>{product.numberOfPlayers}</p>
						{/* <p>{product.descriptions}</p> */}
						<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not
						</p>
					</div>
				</div>
				<div>
					<div className="productDetailPage__best-offer-container">
						<div className="productDetailPage__best-user-container">
							<div className="productDetailPage__user-icon">
								<p>
									{offers[0].name.length > 0
										? offers[0].name[0].toUpperCase()
										: ""}
								</p>
							</div>
							<p>{offers[0].name}</p>
						</div>
						<div className="productDetailPage__price">
							{offers[0].price + " ft"}
						</div>
						<div>
							<button
								className="productDetailPage__cart-button"
								onClick={handleCartButtonClick}
							>
								<i className="bi bi-cart-fill"></i>
								<div>Kosárba</div>
							</button>
						</div>
						<div>
							<button
								className="productDetailPage__favorites-button"
								onClick={handleFavoriteButtonClick}
							>
								<i className="bi bi-heart-pulse-fill"></i>
								<div>Kedvencekhez ad</div>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="productDetailPage__offers-container">
				<div>
					<h4>Ajánlatok</h4>
				</div>
				{offers.map(crateOfferCard)}
			</div>
		</div>
	);
};

export default ProductDetailPage;
