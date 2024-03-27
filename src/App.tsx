import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsScreen from "./components/productsScreen/ProductsScreen.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import { MyContext } from "./Context.ts";
import { Product } from "./DTO/product.ts";
import FilterScreen from "./components/filterScreen/FilterScreen.tsx";
import { CategoryType } from "./DTO/categoryType.ts";

function App() {
	const [products, setProducts] = useState<Product[]>([]);
	const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);

	return (
		<MyContext.Provider
			value={{
				productsContext: { products: products, setProducts: setProducts },
				categoryTypesContext: {
					categoryTypes: categoryTypes,
					setCategoryTypes: setCategoryTypes,
				},
			}}
		>
			<Navbar />
			<div className="container-fluid productsScreen">
				<div className="row">
					<div className="col-11 container-fluid ">
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
			</div>
		</MyContext.Provider>
	);
}

export default App;
