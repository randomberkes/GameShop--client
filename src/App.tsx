import React from "react";
import ProductsScreen from "./pages/productsPage/productsScreen/ProductsScreen.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import FilterScreen from "./pages/productsPage/filterScreen/FilterScreen.tsx";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div>
							<Navbar />
							<div className="container-fluid productsScreen">
								<div className="row">
									<div className="col-11 container-fluid ">
										<Outlet />
									</div>
								</div>
							</div>
						</div>
					}
				>
					<Route
						path="products"
						element={
							<div className="row">
								<div className="col-3 container-fluid ">
									<FilterScreen />
								</div>
								<div className="col-9 container-fluid ">
									<ProductsScreen />
								</div>
							</div>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
