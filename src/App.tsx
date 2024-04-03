import React from "react";

import Navbar from "./components/navbar/Navbar.tsx";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProductsPage from "./pages/productsPage/productsPage.tsx";
import FavoritesScreen from "./pages/favoritesPage/favoritesScreen/favoritesScreen.tsx";
import CartPage from "./pages/cartPage/CartPage.tsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div>
							<Navbar />

							<Outlet />
						</div>
					}
				>
					<Route path="products" element={<ProductsPage />} />
					<Route path="favorites" element={<FavoritesScreen />} />
					<Route path="cart" element={<CartPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
