import React, { useState } from "react";
import "./checkoutPage.css";
import { Outlet } from "react-router-dom";

const CheckoutPage = () => {
	return (
		<div className="checkoutPage__container">
			<div className="checkout-page__header-flex-container">
				{/* <h1 className="checkout-page__logo">GameShop</h1> */}
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
			<Outlet />
		</div>
	);
};

export default CheckoutPage;
