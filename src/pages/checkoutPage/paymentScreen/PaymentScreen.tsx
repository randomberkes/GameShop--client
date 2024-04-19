import React, { useEffect, useRef, useState } from "react";
import "./paymentScreen.css";
import CardInfoForm from "../../../components/cardInfoForm/CardInfoForm.tsx";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import { setCartProducts } from "../../../Redux/cartProductsSlice.ts";
import cartApi from "../../../api/cartApi.ts";
import orderApi from "../../../api/orderApi.ts";

const VISA_MASTER_CARD_REGEX = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
const EXPIRY_DATE_REGEX = /\b(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})\b/;
const CVC_REGEX = /^[0-9]{3,4}$/;

const PaymentScreen = () => {
	const axiosPrivate = useAxiosPrivate();
	const dispatch = useDispatch();
	const { products, finalPrice } = useSelector(
		(state: RootState) => state.cartProducts
	);
	const [hover, setHover] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);

	const [cardNumber, setCardNumber] = useState("");
	const [validCardNumber, setValidCardNumber] = useState(true);
	const [cardNumberFocus, setCardNumberFocus] = useState(true);
	const cardNumberRef = useRef<HTMLInputElement>(null);

	const [expiryDate, setExpiryDate] = useState("");
	const [validExpiryDate, setValidExpiryDate] = useState(true);
	const [expiryDateFocus, setExpiryDateFocus] = useState(true);
	const expiryDateRef = useRef<HTMLInputElement>(null);

	const [cvc, setCvc] = useState("");
	const [validCvc, setValidCvc] = useState(true);
	const [cvcFocus, setCvcFocus] = useState(true);
	const cvcRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const products = await cartApi.getCartProducts(axiosPrivate);
				dispatch(setCartProducts(products));
			} catch (err) {
				console.log(err);
				dispatch(setCartProducts([]));
			}
		};
		getProducts();
		cardNumberRef.current!.focus();
	}, []);

	const handleBlurCardNumber = () => {
		setCardNumberFocus(false);
		const result = VISA_MASTER_CARD_REGEX.test(cardNumber);
		console.log(result);
		console.log(cardNumber);
		setValidCardNumber(result);
	};
	const handleBlurExpiryDate = () => {
		setExpiryDateFocus(false);
		const result = EXPIRY_DATE_REGEX.test(expiryDate);
		console.log(result);
		console.log(expiryDate);
		setValidExpiryDate(result);
	};
	const handleBlurCvc = () => {
		setCvcFocus(false);
		const result = CVC_REGEX.test(cvc);
		console.log(result);
		console.log(cvc);
		setValidCvc(result);
	};

	const handleMouseOver = () => {
		setHover(true);
	};

	const handleMouseOut = () => {
		setHover(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const isValidCardNumber = VISA_MASTER_CARD_REGEX.test(cardNumber);
		const isValidExpiryDate = EXPIRY_DATE_REGEX.test(expiryDate);
		const isValidCvc = CVC_REGEX.test(cvc);

		setValidCardNumber(isValidCardNumber);
		setValidExpiryDate(isValidExpiryDate);
		setValidCvc(isValidCvc);

		if (!isValidCardNumber) {
			cardNumberRef.current!.focus();
		} else if (!isValidExpiryDate) {
			expiryDateRef.current!.focus();
		} else if (!isValidCvc) {
			cvcRef.current!.focus();
		} else {
			const orderItems = products.map((product) => {
				return { amount: product.productCount, productID: product.id };
			});
			await orderApi.addOrderLink(finalPrice, orderItems, axiosPrivate);
		}
	};

	return (
		<div className="paymentScreen__flex-container">
			<div className="paymentScreen__container">
				<form className="paymentScreen__gid-container">
					<div className="paymentScreen__title-container">
						<h4>Adja meg a kártya adatait</h4>
					</div>
					<div className="paymentScreen__card-info-form-container">
						<div className="cardInfoForm__container">
							<div className="cardInfoForm__input-container">
								<div style={{ gridColumn: "span 2" }}>
									<div
										className={
											"cardInfoForm__cardNumber-container" +
											(validCardNumber ? "" : " err")
										}
									>
										<label htmlFor="cardNumber">Kártyaszám</label>
										<input
											type="text"
											id="cardNumber"
											placeholder="1234 1234 1234 1234"
											ref={cardNumberRef}
											onChange={(e) => {
												setCardNumber(e.target.value);
											}}
											onFocus={() => {
												setCardNumberFocus(true);
											}}
											onBlur={handleBlurCardNumber}
										></input>
										{cardNumber === "" ? (
											<p>Kötelező</p>
										) : (
											<p>kártyaszám érvénytelen</p>
										)}
									</div>
								</div>
								<div>
									<div
										className={
											"cardInfoForm__expiry-date-container" +
											(validExpiryDate ? "" : " err")
										}
									>
										<label htmlFor="expiryDate">Lejárati dátum</label>
										<input
											type="text"
											id="expiryDate"
											placeholder="HH/EE"
											ref={expiryDateRef}
											onChange={(e) => {
												setExpiryDate(e.target.value);
											}}
											onFocus={() => {
												setExpiryDateFocus(true);
											}}
											onBlur={handleBlurExpiryDate}
										></input>
										{expiryDate === "" ? (
											<p>Kötelező</p>
										) : (
											<p>Lejárati dátum érvénytelen</p>
										)}
									</div>
								</div>
								<div style={{ justifyContent: "end" }}>
									<div
										className={
											"cardInfoForm__cvv-container" + (validCvc ? "" : " err")
										}
									>
										<label htmlFor="cvc">CVC</label>
										<input
											type="text"
											id="cvc"
											placeholder="CVC"
											ref={cvcRef}
											onChange={(e) => {
												setCvc(e.target.value);
											}}
											onFocus={() => {
												setCvcFocus(true);
											}}
											onBlur={handleBlurCvc}
										></input>
										{cvc === "" ? <p>Kötelező</p> : <p>CVC érvénytelen</p>}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="paymentScreen__card-info-form-container">
						<button
							className={
								"paymentScreen__button" +
								(hover ? " paymentScreen__button_hover" : "")
							}
							onMouseOver={handleMouseOver}
							onMouseOut={handleMouseOut}
							onClick={handleSubmit}
						>
							Fizetés
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PaymentScreen;
