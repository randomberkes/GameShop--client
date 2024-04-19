import React, { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import { useLocation, useNavigate } from "react-router-dom";
import "./checkoutPage.css";
import PaymentScreen from "./paymentScreen/PaymentScreen.tsx";

const CheckoutPage = () => {
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		// const getUsers = async () => {
		// 	try {
		// 		const response = await usersApi.getUsers(axiosPrivate);
		// 		console.log(response);
		// 	} catch (err) {
		// 		console.log(err);
		// 		navigate("/login", { state: { from: location }, replace: true });
		// 	}
		// };
		// getUsers();
	}, []);
	return (
		<div className="checkoutPage__container">
			<div className="checkout-page__header-flex-container">
				<h1 className="checkout-page__logo">GameShop</h1>
				<div className="checkout-page__header-container">
					<div className="checkout-page__header">
						<div className="checkout-page__step-bar-container">
							<div className="checkout-page__step-bar checkout-page__step-bar1_active"></div>
							<div className="checkout-page__step-bar checkout-page__step-bar2_active"></div>
							<div className="checkout-page__step-bar checkout-page__step-bar3_active"></div>
						</div>
						<div className="checkout-page__label-container">
							<h6>Kosár</h6>
							<h6>Rendelés részletei</h6>
							<h6>Rendelés összegzése</h6>
							<h6>Véglegesítés</h6>
						</div>
					</div>
				</div>
			</div>
			<PaymentScreen />
		</div>
	);
};

export default CheckoutPage;
