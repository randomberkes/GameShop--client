import React, { useEffect, useState } from "react";
import "./orderItemCard.css";
import productsApi from "../../api/productsApi.ts";
import { Product } from "../../DTO/product.ts";

const OrderItemCard = (props) => {
	const [color, setColor] = useState("");
	const [icon, setIcon] = useState("");
	const { name, amount, price, productID } = props;
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
	const colors = {
		playstationColor: "#006fcd",
		xboxColor: "#107c10",
		pcColor: "#e72929",
	};
	const icons = {
		playstationIcon: "bi-playstation",
		xboxIcon: "bi-xbox",
		pcIcon: "bi-pc",
	};
	useEffect(() => {
		const getProduct = async () => {
			const product = await productsApi.getProductByID(productID);
			if (product.platform === "PlayStation") {
				setColor(colors.playstationColor);
				setIcon(icons.playstationIcon);
			}
			if (product.platform === "Xbox") {
				setColor(colors.xboxColor);
				setIcon(icons.xboxIcon);
			}
			if (product.platform === "PC") {
				setColor(colors.pcColor);
				setIcon(icons.pcIcon);
			}
			if (product) setProduct(product);
		};
		getProduct();
	}, []);
	return (
		<div
			className="orderItemCard__container"
			style={{ border: `2px solid ${color}` }}
		>
			<div
				className="orderItemCard__container-header"
				style={{ backgroundColor: color }}
			>
				<p>{name}</p>
				<i className={`bi ${icon}`}></i>
			</div>
			<div className="orderItemCard__container-order-iteminfo">
				<div>
					<img src={product.imgPath} />
				</div>

				<div>
					<p>{product.name}</p>
				</div>
				<div>
					<p>{amount}x</p>
				</div>
				<div>
					<p>{price} Ft</p>
				</div>
			</div>
		</div>
	);
};

export default OrderItemCard;
