import React, { useState } from "react";
import "./checkoutPage.css";
import { Outlet, useLocation } from "react-router-dom";

const CheckoutPage = () => {
	const location = useLocation();
	return (
		<div className="checkoutPage__container">
			<div className="checkout-page__header-flex-container">
				{/* <h1 className="checkout-page__logo">GameShop</h1> */}
				<div className="checkout-page__header-container">
					<div className="checkout-page__header">
						<div className="checkout-page__step-bar-container">
							<div>
								<div
									className={
										"checkout-page__step-bar" +
										(location.pathname === "/checkout" ||
										location.pathname === "/payment" ||
										location.pathname === "/success"
											? " checkout-page__step-bar1_active"
											: "")
									}
								></div>
							</div>
							<div>
								<div
									className={
										"checkout-page__step-bar" +
										(location.pathname === "/payment" ||
										location.pathname === "/success"
											? " checkout-page__step-bar2_active"
											: "")
									}
								></div>
							</div>
							<div>
								<div
									className={
										"checkout-page__step-bar" +
										(location.pathname === "/success"
											? " checkout-page__step-bar3_active"
											: "")
									}
								></div>
							</div>
						</div>
						<div className="checkout-page__label-container">
							<h6
								className={
									location.pathname === "/checkout" ||
									location.pathname === "/payment" ||
									location.pathname === "/success"
										? "checkout-page__label1_active"
										: ""
								}
							>
								Rendelés részletei
							</h6>
							<h6
								className={
									location.pathname === "/payment" ||
									location.pathname === "/success"
										? "checkout-page__label2_active"
										: ""
								}
							>
								Rendelés összegzése
							</h6>
							<h6
								className={
									location.pathname === "/success"
										? "checkout-page__label3_active"
										: ""
								}
							>
								Véglegesítés
							</h6>
						</div>
					</div>
				</div>
			</div>
			<div className="checkoutScreen__flex-container">
				<div>
					<div>
						<h2>Rendelés összegzése</h2>
					</div>
					<div
						className={
							"checkoutScreen__backgroun-container" +
							(location.pathname === "/checkout"
								? " checkout-page__background-container1"
								: "") +
							(location.pathname === "/payment"
								? " checkout-page__background-container2"
								: "") +
							(location.pathname === "/success"
								? " checkout-page__background-container3"
								: "")
						}
					>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
