import Collapse from "@mui/material/Collapse";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../../DTO/user";
import usersApi from "../../../api/usersApi.ts";
import "./login.css";

import { setAuthUser } from "../../../Redux/authSlice.ts";
import authApi from "../../../api/authApi.ts";

const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = (props) => {
	const { setEmail } = props;

	const emailRef = useRef<HTMLInputElement>(null);
	const pwdRef = useRef<HTMLInputElement>(null);

	const [emailFocus, setEmailFocus] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");

	const [emailValid, setEmailValid] = useState(true);
	const [pwdValid, setPwdValid] = useState(true);

	const [open, setOpen] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/products";
	const dispatch = useDispatch();

	const handleCheckEmailButtonClick = async (event) => {
		event.preventDefault();
		const user: User | string = await usersApi.getUserByEmail(emailInput);
		if (typeof user == "object") {
			setOpen(true);
		} else {
			setEmail(emailInput);
			navigate("/register");
		}
	};

	const handleCheckPasswordButtonClick = async (event) => {
		event.preventDefault();
		try {
			const auth = await authApi.login(emailInput, passwordInput);
			const accessToken = auth.accessToken;
			const role = auth.role;
			const name = auth.name;
			dispatch(
				setAuthUser({
					name: name,
					email: emailInput,
					accessToken: accessToken,
					role: role,
				})
			);
			navigate(from);
		} catch (err) {
			if (err.response?.status === 401) {
				setPwdValid(false);
			}
		}
	};
	const handleEmailMouseFocus = () => {
		setEmailFocus(true);
	};
	const handlePwdMouseFocus = () => {
		setPwdFocus(true);
	};

	const handleEmailMouseBlur = () => {
		setEmailFocus(false);
		const result = EMAIL_REGEX.test(emailInput);
		setEmailValid(result);
	};
	const handlePwdMouseBlur = () => {
		setPwdFocus(false);
	};
	const handleEmailChange = (event) => {
		setEmailInput(event.target.value);
	};
	const handlePasswordChange = (event) => {
		setPasswordInput(event.target.value);
	};

	return (
		<form className="login__container">
			<div>
				<h1 className="login__h1">GameShop</h1>
			</div>
			<div>
				<h2 className="login__h2">Szia!</h2>
			</div>
			<div>
				<p>Kérjük írd be e-mail címedet</p>
			</div>
			<div>
				<input
					disabled={open}
					ref={emailRef}
					className={
						"login__email-input" +
						(emailFocus ? " login__email-input_focus" : "") +
						(open ? " login__email-input_password-input-open" : "") +
						(!emailValid ? " login__email-input_err" : "") +
						(!emailValid && emailFocus ? " login__email-input_err-focus" : "")
					}
					placeholder="Email"
					value={emailInput}
					onFocus={handleEmailMouseFocus}
					onBlur={handleEmailMouseBlur}
					onChange={handleEmailChange}
					id="0"
				></input>

				<button
					className={
						"login__email-check-button" +
						(emailFocus ? " login__email-check-button_focus" : "") +
						(open ? " login__email-check-button_password-input-open" : "") +
						(!emailValid ? " login__email-check-button_err" : "") +
						(!emailValid && emailFocus
							? " login__email-check-button_err-focus"
							: "")
					}
					onClick={handleCheckEmailButtonClick}
					disabled={!emailValid || emailInput === ""}
				>
					<i
						className={
							"bi bi-arrow-right-circle-fill" +
							(open ? " login__icon_password-input-open" : "")
						}
					></i>
				</button>
			</div>

			{!emailValid ? (
				<p className="login__err-msg">Érvénytelen email</p>
			) : (
				<></>
			)}

			<Collapse in={open}>
				<div className="login__password-and-button-container">
					<div>
						<input
							ref={pwdRef}
							className={
								"login__password-input" +
								(pwdFocus ? " login__password-input_focus" : "") +
								(!pwdValid ? " login__password-input_err" : "") +
								(!pwdValid && pwdFocus
									? " login__password-input_err-focus"
									: "")
							}
							placeholder="Jelszó"
							onFocus={handlePwdMouseFocus}
							onBlur={handlePwdMouseBlur}
							onChange={handlePasswordChange}
							value={passwordInput}
							id="1"
						></input>
						<button
							className={
								"login__password-check-button" +
								(pwdFocus ? " login__email-check-button_focus" : "") +
								(!pwdValid ? " login__password-check-button_err" : "") +
								(!pwdValid && pwdFocus
									? " login__password-check-button_err-focus"
									: "")
							}
							onClick={handleCheckPasswordButtonClick}
						>
							<i className={"bi bi-arrow-right-circle-fill"}></i>
						</button>
					</div>
				</div>
			</Collapse>
			{!pwdValid ? <p className="login__err-msg">Helytelen jelszó</p> : <></>}
		</form>
	);
};

export default Login;
