import React from "react";
import "./productCard.css";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
	const navigate = useNavigate();
	const { productData, buttons } = props;

	const handleClick = () => {
		navigate(`/products/${productData.id}`);
	};

	return (
		<div className="productCard_Container">
			<div className="productCard_ImgContainer" onClick={handleClick}>
				<img
					className="productCard_mainImg"
					src={process.env.PUBLIC_URL + productData.imgPath}
				/>
			</div>

			<div onClick={handleClick}>
				<h5 className="card-title">{productData.name}</h5>
				<h6 className="">{productData.platform}</h6>
				<ul className="list">
					<li>
						Játékeszköz kompatibilitás: {productData.gameDeviceCompatibility}
					</li>
					<li>Játék típusa: {productData.gameType}</li>
					<li>Rating PEGI (ajánlott korosztály): {productData.ratingPegi}</li>
					<li>Játékosok száma: {productData.numberOfPlayers}</li>
				</ul>
			</div>
			{buttons}
		</div>
	);
}

export default ProductCard;
