import React from "react";
import ProductsScreen from "./components/productsScreen/ProductsScreen.tsx";
import Navbar from "./components/navbar/Navbar.tsx";

import FilterScreen from "./components/filterScreen/FilterScreen.tsx";

function App() {
	return (
		<div>
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
		</div>
	);
}

export default App;
