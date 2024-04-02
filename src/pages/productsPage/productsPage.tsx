import React from "react";
import FilterScreen from "./filterScreen/FilterScreen.tsx";
import ProductsScreen from "./productsScreen/ProductsScreen.tsx";
import "./productsPage.css";

const ProductsPage = () => {
	return (
		<div className="container-md ">
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
