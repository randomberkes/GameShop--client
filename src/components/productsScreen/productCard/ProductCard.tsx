import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCardButton from "./productCardButton/ProductCardButton.tsx";
import "./productCard.css";
import { Product } from "../../../DTO/product.ts";

function ProductCard(props) {
	const icons = [
		<i className="bi bi-heart"></i>,
		<i className="bi bi-cart"></i>,
	];

	const { productData } = props;

	console.log(productData);

	return (
		<div className="col-9 container-fluid productCard">
			<div className="row">
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
							<ProductCardButton icon={icons[0]} />
						</div>
						<div className="row justify-content-end price">
							<h4>{productData.price}ft</h4>
						</div>
						<div className="row justify-content-end">
							<ProductCardButton icon={icons[1]} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
