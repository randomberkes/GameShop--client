import React, {
	MutableRefObject,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import "./cardInfoForm.css";

const VISA_MASTER_CARD_REGEX = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
const EXPIRY_DATE_REGEX = /\b(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})\b/;
const CVC_REGEX = /^[0-9]{3,4}$/;

const CardInfoForm = (props) => {
	const { areInputsValid } = props;
	const cardNumberRef = useRef<HTMLInputElement>(null);
	const expiryDateRef = useRef<HTMLInputElement>(null);
	const cvcRef = useRef<HTMLInputElement>(null);

	const [cardNumber, setCardNumber] = useState("");
	const [validCardNumber, setValidCardNumber] = useState(true);
	const [cardNumberFocus, setCardNumberFocus] = useState(true);

	const [expiryDate, setExpiryDate] = useState("");
	const [validExpiryDate, setValidExpiryDate] = useState(true);
	const [expiryDateFocus, setExpiryDateFocus] = useState(true);

	const [cvc, setCvc] = useState("");
	const [validCvc, setValidCvc] = useState(true);
	const [cvcFocus, setCvcFocus] = useState(true);
	const [errMsgCvc, setErrMsgCvc] = useState("");

	const [success, setSuccess] = useState(false);

	useEffect(() => {
		cardNumberRef.current!.focus();
	}, []);

	const handleBlurCardNumber = () => {
		setCardNumberFocus(false);
		const result = VISA_MASTER_CARD_REGEX.test(cardNumber);
		console.log(result);
		console.log(cardNumber);
		setValidCardNumber(result);
		areInputsValid(result, validExpiryDate, validCvc);
	};
	const handleBlurExpiryDate = () => {
		setExpiryDateFocus(false);
		const result = EXPIRY_DATE_REGEX.test(expiryDate);
		console.log(result);
		console.log(expiryDate);
		setValidExpiryDate(result);
		areInputsValid(validCardNumber, result, validCvc);
	};
	const handleBlurCvc = () => {
		setCvcFocus(false);
		const result = CVC_REGEX.test(cvc);
		console.log(result);
		console.log(cvc);
		setValidCvc(result);
		areInputsValid(validCardNumber, validExpiryDate, result);
	};

	// useEffect(() => {
	// 	const result = CVC_REGEX.test(cvc);
	// 	console.log(result);
	// 	console.log(cvc);
	// 	setValidCvc(result);
	// }, [cardNumber, expiryDate, cvc]);

	return (
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
							required
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
							onChange={(e) => {
								setExpiryDate(e.target.value);
							}}
							required
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
						className={"cardInfoForm__cvv-container" + (validCvc ? "" : " err")}
					>
						<label htmlFor="cvc">CVC</label>
						<input
							type="text"
							id="cvc"
							placeholder="CVC"
							onChange={(e) => {
								setCvc(e.target.value);
							}}
							required
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
	);
};

export default CardInfoForm;
