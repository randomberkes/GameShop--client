import React, { useEffect, useState } from "react";
import FilterScreen from "./filterScreen/FilterScreen.tsx";
import ProductsScreen from "./productsScreen/ProductsScreen.tsx";
import "./productsPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store.ts";

const ProductsPage = () => {
	const { filter } = useSelector((state: RootState) => state.products);
	const [patformBarContent, setPlatformBarContent] = useState({
		name: "Any Platform",
		icon: <></>,
		style: "",
	});
	const icons = [
		{
			name: "PlayStation",
			icon: <i className="bi bi-playstation"></i>,
			style: "gamePlatformIndicatorBarPlayStation",
		},
		{
			name: "Xbox",
			icon: <i className="bi bi-xbox"></i>,
			style: "gamePlatformIndicatorBarXbox",
		},
		{
			name: "PC",
			icon: <i className="bi bi-pc"></i>,
			style: "gamePlatformIndicatorBarPC",
		},
	];

	let platformBarStyle = {
		name: "Any Platform",
		icon: <></>,
		hoverColor: "#D65A31",
	};

	const selectPlatformBarStyle = () => {
		if (filter.platform) {
			icons.forEach((icon) => {
				if (icon.name === filter.platform![0]) {
					setPlatformBarContent(icon);
				}
			});
		}
	};

	useEffect(() => {
		selectPlatformBarStyle();
		console.log(platformBarStyle);
	}, [filter]);
	return (
		<div className="container-md ">
			<div
				className={
					"row gamePlatformIndicatorBar text-center align-items-center " +
					patformBarContent.style
				}
			>
				<div className="col">
					{patformBarContent.name}
					{patformBarContent.icon}
				</div>
			</div>
			<div className="row">
				<div className="col-3 container-fluid filter">
					<FilterScreen />
				</div>
				<div className="col-12 col-lg-9 container-fluid ">
					<ProductsScreen />
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;
