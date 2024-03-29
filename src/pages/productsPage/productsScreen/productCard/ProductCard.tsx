import React from "react";
import ProductCardButton from "./productCardButton/ProductCardButton.tsx";
import "./productCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addProductToFavorites } from "../../../../Redux/favoriteProductsSlice.ts";
import { addProductToCart } from "../../../../Redux/cartProductsSlice.ts";

function ProductCard(props) {
	const { productData } = props;
	const dispatch = useDispatch();
	const icons = [
		<i className="bi bi-heart"></i>,
		<i className="bi bi-cart"></i>,
	];

	const handleCartButtonClick = () => {
		dispatch(addProductToCart(productData));
	};
	const handleFavoriteButtonClick = () => {
		dispatch(addProductToFavorites(productData));
	};

	return (
		<div className="row productCard">
			<div className="col-3 container-fluid">
				<div className="row">
					<div className="col-2"></div>
					<img
						className="mainImg col-8"
						src={process.env.PUBLIC_URL + "/images/SpiderMan2PS5BoxArt.jpeg"}
					/>
					<div className="col-2"></div>
				</div>
			</div>

			<div className="col-7 container-fluid">
				<div className="row textRow align-items-center ">
					<div className="col">
						<h5 className="card-title">{productData.name}</h5>
						<h6 className="card-subtitle mb-2 text-body-secondary">
							{productData.platform}
						</h6>
						<ul>
							<li>
								Játékeszköz kompatibilitás:{" "}
								{productData.gameDeviceCompatibility}
							</li>
							<li>Játék típusa: {productData.gameType}</li>
							<li>
								Rating PEGI (ajánlott korosztály): {productData.ratingPegi}
							</li>
							<li>Játékosok száma: {productData.numberOfPlayers}</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="container-fluid col-2">
				<div className="buttonsRow row align-items-center ">
					<div className="row  justify-content-end">
						<ProductCardButton
							handleClick={handleFavoriteButtonClick}
							icon={icons[0]}
						/>
					</div>
					<div className="row justify-content-end price">
						{productData.price}ft
					</div>
					<div className="row justify-content-end">
						<ProductCardButton
							handleClick={handleCartButtonClick}
							icon={icons[1]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;