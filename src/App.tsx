import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsScreen from "./components/productsScreen/ProductsScreen.tsx";
import Navbar from "./components/navbar/Navbar.tsx";

function App() {
	const [backendData, setBackendData] = useState([]);

	useEffect(() => {
		axios.get("/users/api").then((response) => {
			console.log(response.data);
			setBackendData(response.data[0].name);
		});
	}, []);

	return (
		<div>
			<Navbar />
			<ProductsScreen />
		</div>
	);
}

export default App;
