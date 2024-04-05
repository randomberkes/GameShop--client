import React from "react";
import CartProductCardButton from "./cartProductCardButton/cartProductCardButton.tsx";
import "./cartProductCard.css";
import { useDispatch } from "react-redux";
import {
	decreaseCountOfProduct,
	deleteProductFromCart,
	increaseCountOfProduct,
	updatePrice,
} from "../../../../Redux/cartProductsSlice.ts";

function FavoriteProductCard(props) {
	const dispatch = useDispatch();
	const icons = [
		<i className="bi bi-cart"></i>,
		<i className="bi bi-trash3"></i>,
	];

	const { productData, productsCount, id } = props;

	const handleDeleteButtonClick = () => {
		dispatch(deleteProductFromCart(productData.id));
		dispatch(updatePrice());
	};
	const handlePlusButtonClick = () => {
		dispatch(increaseCountOfProduct(id));
		dispatch(updatePrice());
	};
	const handleMinusButtonClick = () => {
		dispatch(decreaseCountOfProduct(id));
		dispatch(updatePrice());
	};

	return (
		<div className="row cartProductCard">
			<div className="col-5 col-sm-5 col-md-4 col-xxl-3 container-fluid">
				<div className="row justify-content-center">
					<img
						className="mainImg col-8"
						src={process.env.PUBLIC_URL + productData.imgPath}
					/>
				</div>
			</div>

			<div className="col-7 col-sm-7 col-md-5 col-xxl-7 container-fluid">
				<div className="row textRow align-items-center ">
					<div className="col">
						<h5 className="card-title">{productData.name}</h5>
						<h6 className="card-subtitle mb-2 text-body-secondary">
							{productData.platform}
						</h6>
						<ul className="list">
							<li>
								Játékeszköz kompatibilitás:
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
			<div className="container-fluid text-center col-12 col-sm-12 col-md-3 col-xxl-2">
				<div className="buttonsRow row align-items-center ">
					<div className="col-12 col-sm-4 col-md-12 price">
						{(productData.price * productData.productCount).toFixed(3)}
						ft
					</div>
					<div className="col-12 col-sm-4 col-md-12">
						<button
							className="plusMinusButton"
							disabled={productsCount == 1}
							onClick={handleMinusButtonClick}
						>
							<i className="bi bi-dash plusMinusIcon"></i>
						</button>
						<span>{productsCount}</span>
						<button className="plusMinusButton" onClick={handlePlusButtonClick}>
							<i className="bi bi-plus plusMinusIcon"></i>
						</button>
					</div>
					<div className="col-12 col-sm-4 col-md-12">
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
