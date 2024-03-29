import React from "react";
import CartProductCardButton from "./cartProductCardButton/cartProductCardButton.tsx";
import "./cartProductCard.css";
import { useDispatch } from "react-redux";
import { deleteProductFromCart } from "../../../../Redux/cartProductsSlice.ts";

function FavoriteProductCard(props) {
	const dispatch = useDispatch();
	const icons = [
		<i className="bi bi-cart"></i>,
		<i className="bi bi-trash3"></i>,
	];

	const { productData } = props;

	const handleDeleteButtonClick = () => {
		console.log("DELETE");
		dispatch(deleteProductFromCart(productData.id));
	};
	const handleCartButtonClick = () => {
		console.log("DELETE");
		dispatch(productData.id);
	};

	return (
		<div className="row cartProductCard">
			<div className="col-3 container-fluid">
				<div className="row justify-content-center">
					<img
						className="mainImg col-8"
						src={process.env.PUBLIC_URL + "/images/SpiderMan2PS5BoxArt.jpeg"}
					/>
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
						<CartProductCardButton icon={icons[0]} />
					</div>
					<div className="row justify-content-end price">
						{productData.price}ft
					</div>
					<div className="row justify-content-end">
						<CartProductCardButton
							handleClick={handleDeleteButtonClick}
							icon={icons[1]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FavoriteProductCard;
