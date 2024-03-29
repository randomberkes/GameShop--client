import React from "react";
import FilterScreen from "./filterScreen/FilterScreen.tsx";
import ProductsScreen from "./productsScreen/ProductsScreen.tsx";

const ProductsPage = () => {
	return (
		<div className="container-fluid productsScreen">
			<div className="row">
				<div className="col-11 container-fluid "></div>
				<div className="row">
					<div className="col-3 container-fluid ">
						<FilterScreen />
					</div>
					<div className="col-9 container-fluid ">
						<ProductsScreen />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;
