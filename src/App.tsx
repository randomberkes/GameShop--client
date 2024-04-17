import React from "react";

import Navbar from "./components/navbar/Navbar.tsx";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProductsPage from "./pages/productsPage/productsPage.tsx";
import FavoritesScreen from "./pages/favoritesPage/favoritesScreen/favoritesScreen.tsx";
import CartPage from "./pages/cartPage/CartPage.tsx";
import "./App.css";
import LoginRegisterPage from "./pages/loginRegisterPage/LoginRegisterPage.tsx";
import RequireAuth from "./components/auth/RequireAuth.tsx";
import CheckoutPage from "./pages/checkoutPage/CheckoutPage.tsx";
import PersistsLogin from "./components/auth/PersistLogin.tsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div>
							<Navbar />
							<div className="mainContainer">
								<Outlet />
							</div>
						</div>
					}
				>
					<Route path="products" element={<ProductsPage />} />
					<Route path="favorites" element={<FavoritesScreen />} />
					<Route path="cart" element={<CartPage />} />
					<Route element={<PersistsLogin />}>
						<Route element={<RequireAuth />}>
							<Route path="checkout" element={<CheckoutPage />}></Route>
						</Route>
					</Route>
				</Route>
				<Route path="/*" element={<LoginRegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
