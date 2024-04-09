import React, { useState } from "react";
import "./login.css";
import Collapse from "@mui/material/Collapse";

const Login = () => {
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState({
		email: false,
		password: false,
	});

	const handleCheckEmailButtonClick = (event) => {
		event.preventDefault();
		setOpen(true);
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
	console.log(focus);

	return (
		<form className="login_container">
			<div className="login__container">
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
						onFocus={handleOnFocus}
						onBlur={handleOnBlur}
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
								placeholder="Password"
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
			</div>
		</form>
	);
};

export default Login;
