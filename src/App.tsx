import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsScreen from "./components/productsScreen/ProductsScreen.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import { ProductsContext } from "./Context.ts";
import { Product } from "./DTO/product.ts";

function App() {
	const [products, setProducts] = useState<Product[]>([]);

	return (
		<ProductsContext.Provider
			value={{ products: products, setProducts: setProducts }}
		>
			<Navbar />
			<ProductsScreen />
		</ProductsContext.Provider>
	);
}

export default App;
