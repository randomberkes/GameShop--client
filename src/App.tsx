import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import PersistsLogin from './components/auth/PersistLogin.tsx';
import RequireAuth from './components/auth/RequireAuth.tsx';
import EditUserDataForm from './components/editUserDataForm/EditUserDataForm.tsx';
import Navbar from './components/navbar/Navbar.tsx';
import UserAccountCard from './components/userAccountCard/UserAccountCard.tsx';
import UserAccountNavbar from './components/userAccountNavbar/UserAccountNavbar.tsx';
import CartPage from './pages/cartPage/CartPage.tsx';
import CheckoutPage from './pages/checkoutPage/CheckoutPage.tsx';
import OrderSummary from './pages/checkoutPage/orderSummary/OrderSummary.tsx';
import PaymentScreen from './pages/checkoutPage/paymentScreen/PaymentScreen.tsx';
import SuccessScreen from './pages/checkoutPage/successScreen/SuccessScreen.tsx';
import FavoritesScreen from './pages/favoritesPage/favoritesScreen/favoritesScreen.tsx';
import LoginRegisterPage from './pages/loginRegisterPage/LoginRegisterPage.tsx';
import ProductDetailPage from './pages/productDetailPage/ProductDetailPage.tsx';
import FilterScreen from './pages/productsPage/filterScreen/FilterScreen.tsx';
import ProductsPage from './pages/productsPage/productsPage.tsx';
import UserAccountPage from './pages/userAccountPage/UserAccountPage.tsx';
import ActivationKeysScreen from './pages/userAccountPage/activationKeysScreen/ActivationKeysScreen.tsx';
import AdvertisementsScreen from './pages/userAccountPage/advertisementsScreen/AdvertisementsScreen.tsx';
import PuchasesScreen from './pages/userAccountPage/purchasesScreen/PuchasesScreen.tsx';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<PersistsLogin />}>
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
						<Route path="products/:productID" element={<ProductDetailPage />} />
						<Route path="products" element={<ProductsPage />}></Route>
						<Route path="products/filter" element={<FilterScreen />} />
						<Route path="favorites" element={<FavoritesScreen />} />
						<Route path="cart" element={<CartPage />} />
						<Route element={<RequireAuth />}>
							<Route path="user" element={<UserAccountPage />}>
								<Route path="myAccount" element={<UserAccountCard />}>
									<Route path="edit" element={<EditUserDataForm />}></Route>
								</Route>
								<Route path="purchases" element={<PuchasesScreen />}></Route>
								<Route
									path="activationKeys"
									element={<ActivationKeysScreen />}
								></Route>
								<Route
									path="advertisements"
									element={<AdvertisementsScreen />}
								></Route>
								<Route path="nav" element={<UserAccountNavbar />}></Route>
							</Route>
						</Route>
					</Route>
					<Route path="/*" element={<LoginRegisterPage />} />
					<Route element={<RequireAuth />}>
						<Route path="/" element={<CheckoutPage />}>
							<Route path="checkout" element={<OrderSummary />}></Route>
							<Route path="payment" element={<PaymentScreen />}></Route>
							<Route path="success" element={<SuccessScreen />}></Route>
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
