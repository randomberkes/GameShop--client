import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import Collapse from "@mui/material/Collapse";
import usersApi from "../../../api/usersApi.ts";
import { User } from "../../../DTO/user";
import { useDispatch } from "react-redux";

import { setAuthUser } from "../../../Redux/authSlice.ts";
import authApi from "../../../api/authApi.ts";

const Login = (props) => {
	const { setEmail } = props;

	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState({
		email: false,
		password: false,
	});

	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [errMsg, setErrMsg] = useState("");

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
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
		}
	};
	const handleOnFocus = (event) => {
		const id = event.target.id;
		setFocus((previousFocus) => {
			return {
				...previousFocus,
				[Object.keys(previousFocus)[id]]: true,
			};
		});
	};
	const handleOnBlur = (event) => {
		const id = event.target.id;
		setFocus((previousFocus) => {
			return {
				...previousFocus,
				[Object.keys(previousFocus)[id]]: false,
			};
		});
	};
	const handleEmailChange = (event) => {
		setEmailInput(event.target.value);
	};
	const handlePasswordChange = (event) => {
		setPasswordInput(event.target.value);
	};

	return (
		<form className="login__container">
			{/* <div className="login__container"> */}
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
					className={
						"login__email-input" +
						(focus.email ? " login__email-input_focus" : "") +
						(open ? " login__email-input_password-input-open" : "")
					}
					placeholder="Email"
					value={emailInput}
					onFocus={handleOnFocus}
					onBlur={handleOnBlur}
					onChange={handleEmailChange}
					id="0"
				></input>

				<button
					className={
						"login__email-check-button" +
						(focus.email ? " login__email-check-button_focus" : "") +
						(open ? " login__email-check-button_password-input-open" : "")
					}
					onClick={handleCheckEmailButtonClick}
				>
					<i
						className={
							"bi bi-arrow-right-circle-fill" +
							(open ? " login__icon_password-input-open" : "")
						}
					></i>
				</button>
			</div>

			<Collapse in={open}>
				<div className="login__password-and-button-container">
					<div>
						<input
							className={
								"login__password-input" +
								(focus.password ? " login__password-input_focus" : "")
							}
							placeholder="Jelszó"
							onFocus={handleOnFocus}
							onBlur={handleOnBlur}
							onChange={handlePasswordChange}
							value={passwordInput}
							id="1"
						></input>
						<button
							className={
								"login__password-check-button" +
								(focus.password ? " login__email-check-button_focus" : "")
							}
							onClick={handleCheckPasswordButtonClick}
						>
							<i className={"bi bi-arrow-right-circle-fill"}></i>
						</button>
					</div>
				</div>
			</Collapse>
			<div>
				<a className="login__h2">Fiók létrehozása</a>
			</div>
		</form>
	);
};

export default Login;
