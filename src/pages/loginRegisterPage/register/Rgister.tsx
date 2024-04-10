import React, { useRef, useState } from "react";
import "./register.css";
import usersApi from "../../../api/usersApi.ts";
import { User } from "../../../DTO/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import { setUserName, setUserPassword } from "../../../Redux/userSlice.ts";
import Input from "./input/input.tsx";

const Register = () => {
	const inputRefUserName = useRef<HTMLInputElement>(null);
	const inputRefPassword = useRef<HTMLInputElement>(null);
	const inputRefRepeatPassword = useRef<HTMLInputElement>(null);
	const { user } = useSelector((state: RootState) => state.user);
	const [inputs, setInputs] = useState([
		{ id: 0, error: false, ref: inputRefUserName },
		{ id: 1, error: false, ref: inputRefPassword },
		{ id: 2, error: false, ref: inputRefRepeatPassword },
	]);

	const dispatch = useDispatch();

	const [repeatPassword, setRepeatPassword] = useState("");
	const [hover, setHover] = useState(false);

	const handleMouseOver = () => {
		setHover(true);
	};

	const handleMouseOut = () => {
		setHover(false);
	};

	const handleChangeUserName = (event) => {
		dispatch(setUserName(event.target.value));
	};
	const handleChangePassword = (event) => {
		dispatch(setUserPassword(event.target.value));
	};
	const handleChangeRepeatPassword = (event) => {
		setRepeatPassword(event.target.value);
	};
	const notEmptyValidation = (id, event) => {
		let message = "";
		console.log();
		if (event.target.value.length === 0) {
			setError(id, true);
			message = "Kötelező mező";
		}
		return message;
	};

	const differentPasswordsValidation = (id, event): string => {
		let message = "";
		if (user.password !== repeatPassword) {
			setError(id, true);
			message = "A jelszavak nem egyeznek meg.";
		}
		return message;
	};

	const setError = (id: number, value: boolean) => {
		setInputs((prevInputs) => {
			const newInputs = [...prevInputs];

			newInputs[id].error = value;

			return newInputs;
		});
	};

	const handleClick = (event) => {
		event.preventDefault();
		inputs.forEach((element) => {
			element.ref.current?.focus();
		});
		setTimeout(() => {
			inputs.some((element) => {
				if (element.error) {
					console.log("HIIIIIIIIIIIIIIIIIIIIIiiii");
					element.ref.current?.focus();
					return element.error;
				}
			});
		});
	};

	return (
		<form className="register__container">
			<div>
				<h1 className="register__h1">GameShop</h1>
			</div>
			<div>
				<h2 className="register__h2">Üdv!</h2>
			</div>

			<div>
				<p> {user.email}</p>
			</div>
			<div>
				<p>
					Úgy tűnik, hogy nincs GameShop fiókod. Gyere, készítsünk egy új
					fiókot!
				</p>
			</div>
			<div>
				<p>Vezetéknév és keresztnév</p>
			</div>
			<div>
				<Input
					key={inputs[0].id}
					id={inputs[0].id}
					inputRef={inputs[0].ref}
					error={inputs[0].error}
					setError={setError}
					inputValue={user.name}
					handleInputChange={handleChangeUserName}
					validationList={[notEmptyValidation]}
				/>
			</div>
			<div>
				<p>Válassz egy biztonságos jelszót</p>
			</div>
			<div>
				<Input
					key={inputs[1].id}
					id={inputs[1].id}
					inputRef={inputs[1].ref}
					error={inputs[1].error}
					setError={setError}
					inputValue={user.password}
					handleInputChange={handleChangePassword}
					validationList={[differentPasswordsValidation, notEmptyValidation]}
				/>
			</div>
			<div>
				<p>Jelszó megerősítése</p>
			</div>
			<div>
				<Input
					key={inputs[2].id}
					id={inputs[2].id}
					inputRef={inputs[2].ref}
					error={inputs[2].error}
					setError={setError}
					inputValue={repeatPassword}
					handleInputChange={handleChangeRepeatPassword}
					validationList={[differentPasswordsValidation, notEmptyValidation]}
				/>
			</div>

			<div>
				<button
					className={
						"register__button" + (hover ? " register__button_hover" : "")
					}
					onClick={handleClick}
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				>
					Folytasd
				</button>
			</div>
		</form>
	);
};

export default Register;
