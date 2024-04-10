import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Collapse from "@mui/material/Collapse";
import usersApi from "../../../api/usersApi.ts";
import { User } from "../../../DTO/user";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../../Redux/userSlice.ts";

const Login = () => {
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState({
		email: false,
		password: false,
	});
	const [emailInput, setEmailInput] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleCheckEmailButtonClick = async (event) => {
		event.preventDefault();
		const user: User | string = await usersApi.getUserByEmail(emailInput);
		if (typeof user == "object") {
			setOpen(true);
		} else {
			dispatch(setUserEmail(emailInput));
			navigate("/register");
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
	const handleChange = (event) => {
		setEmailInput(event.target.value);
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
					onChange={handleChange}
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
							id="1"
						></input>
						<button
							className={
								"login__password-check-button" +
								(focus.password ? " login__email-check-button_focus" : "")
							}
							onClick={handleCheckEmailButtonClick}
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
