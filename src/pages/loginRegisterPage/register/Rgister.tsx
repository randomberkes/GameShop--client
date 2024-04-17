import React, { useRef, useState } from "react";
import "./register.css";
import usersApi from "../../../api/usersApi.ts";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../../Redux/authSlice.ts";
import Input from "./input/input.tsx";
import authApi from "../../../api/authApi.ts";
import { User } from "../../../DTO/user.ts";
import { useLocation, useNavigate } from "react-router-dom";
import ROLES_LIST from "../../../config/roles_list.ts";
let roles: string[] = [ROLES_LIST.Seller];

const Register = (props) => {
	const { email } = props;

	const inputRefUserName = useRef<HTMLInputElement>(null);
	const inputRefPassword = useRef<HTMLInputElement>(null);
	const inputRefRepeatPassword = useRef<HTMLInputElement>(null);

	const [inputs, setInputs] = useState([
		{ id: 0, error: false, ref: inputRefUserName },
		{ id: 1, error: false, ref: inputRefPassword },
		{ id: 2, error: false, ref: inputRefRepeatPassword },
	]);
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [hover1, setHover1] = useState(false);
	const [hover2, setHover2] = useState(false);
	const [hover3, setHover3] = useState(false);
	const [clicked1, setClicked1] = useState(true);
	const [clicked2, setClicked2] = useState(false);

	const [errMsg, setErrMsg] = useState("");

	const location = useLocation();
	const from = location.state?.from?.pathname || "/products";

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleMouseOver1 = () => {
		setHover1(true);
	};
	const handleMouseOut1 = () => {
		setHover1(false);
	};

	const handleMouseOver2 = () => {
		setHover2(true);
	};
	const handleMouseOut2 = () => {
		setHover2(false);
	};

	const handleMouseOver3 = () => {
		setHover3(true);
	};
	const handleMouseOut3 = () => {
		setHover3(false);
	};

	const handleChangeUserName = (event) => {
		setName(event.target.value);
	};
	const handleChangePassword = (event) => {
		setPassword(event.target.value);
	};
	const handleChangeRepeatPassword = (event) => {
		setRepeatPassword(event.target.value);
	};

	const handleSellerButtonClick = (event?) => {
		event?.preventDefault();
		const newClicked = !clicked1;
		setClicked1(newClicked);
		if (newClicked) {
			roles.push(ROLES_LIST.Seller);
		} else {
			roles = roles.filter((role) => {
				return role !== ROLES_LIST.Seller;
			});
		}
		if (!newClicked && roles.length < 1) handleBuyerButtonClick(null);
	};

	const handleBuyerButtonClick = (event?) => {
		event?.preventDefault();
		const newClicked = !clicked2;
		setClicked2(newClicked);
		if (newClicked) {
			roles.push(ROLES_LIST.Buyer);
		} else {
			roles = roles.filter((role) => {
				return role !== ROLES_LIST.Buyer;
			});
		}
		if (!newClicked && roles.length < 1) handleSellerButtonClick(null);
	};

	const notEmptyValidation = (id, event) => {
		let message = "";
		if (event.target.value.length === 0) {
			setError(id, true);
			message = "Kötelező mező";
		}
		return message;
	};
	const differentPasswordsValidation = (id, event): string => {
		let message = "";
		if (password !== repeatPassword) {
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

	const register = async (user: User) => {
		try {
			console.log(user);
			await usersApi.postUser(user);
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 500) {
				setErrMsg("Internal Server Error");
			} else {
				setErrMsg("Regiset Failed");
			}
		}
	};

	const handleClick = async (event) => {
		let formValid: boolean = true;
		event.preventDefault();
		inputs.forEach((element) => {
			element.ref.current?.focus();
		});
		setTimeout(() => {
			inputs.some((element) => {
				if (element.error) {
					formValid = false;
					element.ref.current?.focus();
					return element.error;
				}
			});
		});
		if (formValid) {
			const newUser: User = {
				name: name,
				email: email,
				password: password,
				roles: roles,
			};
			await register(newUser);
			const auth = await authApi.login(newUser.email, newUser.password);
			const accessToken = auth.accessToken;
			const role = auth.role;
			dispatch(
				setAuthUser({
					name: newUser.name,
					email: newUser.email,
					accessToken: accessToken,
					role: role,
				})
			);
			navigate(from);
		}
		roles = [];
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
				<p> {email}</p>
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
					inputValue={name}
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
					inputValue={password}
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
					validationList={[notEmptyValidation]}
				/>
			</div>

			<div>
				<button
					className={
						"register__seller-button" +
						(hover1 ? " register__button_hover" : "") +
						(clicked1 ? " register__seller-button_clicked" : "")
					}
					onMouseOver={handleMouseOver1}
					onMouseOut={handleMouseOut1}
					onClick={handleSellerButtonClick}
				>
					Vásárló
				</button>
				<button
					className={
						"register__buyer-button" +
						(hover2 ? " register__button_hover" : "") +
						(clicked2 ? " register__buyer-button_clicked" : "")
					}
					onMouseOver={handleMouseOver2}
					onMouseOut={handleMouseOut2}
					onClick={handleBuyerButtonClick}
				>
					Eladó
				</button>
			</div>

			<div>
				<button
					className={
						"register__button" + (hover3 ? " register__button_hover" : "")
					}
					onClick={handleClick}
					onMouseOver={handleMouseOver3}
					onMouseOut={handleMouseOut3}
				>
					Folytasd
				</button>
			</div>
		</form>
	);
};

export default Register;
