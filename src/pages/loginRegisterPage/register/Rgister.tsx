import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../../DTO/user.ts";
import { setAuthUser } from "../../../Redux/authSlice.ts";
import authApi from "../../../api/authApi.ts";
import usersApi from "../../../api/usersApi.ts";
import Input from "./input/input.tsx";
import "./register.css";
const NAME_REGEX =
	/^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u01FF]+([ \-']{0,1}[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u01FF]+){0,2}[.]{0,1}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = (props) => {
	const { email } = props;
	const location = useLocation();
	const from = location.state?.from?.pathname || "/products";

	const [hover, setHover] = useState(false);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const nameRef = useRef<HTMLInputElement>(null);
	const pwdRef = useRef<HTMLInputElement>(null);
	const repeatPwdRef = useRef<HTMLInputElement>(null);

	const [nameFocus, setNameFocus] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);
	const [repeatPwdFocus, setRepeatPwdFocus] = useState(false);

	const [nameValid, setNameValid] = useState(true);
	const [pwdValid, setPwdValid] = useState(true);
	const [repeatPwdValid, setRepeatPwdValid] = useState(true);

	const [name, setName] = useState("");
	const [pwd, setPwd] = useState("");
	const [repeatPwd, setRepeatPwd] = useState("");

	const handleNameMouseFocus = () => {
		setNameFocus(true);
	};
	const handlePwdMouseFocus = () => {
		setPwdFocus(true);
	};
	const handleRepeatPwdMouseFocus = () => {
		setRepeatPwdFocus(true);
	};

	const handleNameMouseBlur = () => {
		setNameFocus(false);
		const result = NAME_REGEX.test(name);

		setNameValid(result);
	};
	const handlePwdMouseBlur = () => {
		setPwdFocus(false);
		const result = PWD_REGEX.test(pwd);

		setPwdValid(result);
	};
	const handleRepeatPwdMouseBlur = () => {
		setRepeatPwdFocus(false);

		setRepeatPwdValid(pwd === repeatPwd);
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handlePwdChange = (e) => {
		setPwd(e.target.value);
	};
	const handleRepeatPwdChange = (e) => {
		setRepeatPwd(e.target.value);
	};

	const handleClick = async (event) => {
		event.preventDefault();
		if (!NAME_REGEX.test(name)) {
			setNameValid(false);
			nameRef.current!.focus();
		} else if (!PWD_REGEX.test(pwd)) {
			setPwdValid(false);
			pwdRef.current!.focus();
		} else if (pwd !== repeatPwd) {
			setRepeatPwdValid(false);
			repeatPwdRef.current!.focus();
		} else {
			const newUser: User = {
				name: name,
				email: email,
				password: pwd,
			};
			await usersApi.postUser(newUser);
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
					key={0}
					ref={nameRef}
					onFocus={handleNameMouseFocus}
					onBlur={handleNameMouseBlur}
					onChange={handleNameChange}
					value={name}
					focus={nameFocus}
					error={!nameValid}
				/>
			</div>
			<div>
				{!nameFocus && !nameValid ? (
					name === "" ? (
						<p className="register__errorMsg">Kötelező</p>
					) : (
						<p className="register__errorMsg">Név érvénytelen</p>
					)
				) : (
					<></>
				)}
				{nameFocus ? (
					<p className="editUserFormData__instructions">
						4-24 karakter.
						<br /> Betűvel kell kezdeni.
						<br /> Betűk, számok, aláhúzásjelek, kötőjelek megengedettek.
					</p>
				) : (
					<></>
				)}
			</div>
			<div>
				<p>Válassz egy biztonságos jelszót</p>
			</div>
			<div>
				<Input
					key={1}
					ref={pwdRef}
					onFocus={handlePwdMouseFocus}
					onBlur={handlePwdMouseBlur}
					onChange={handlePwdChange}
					value={pwd}
					focus={pwdFocus}
					error={!pwdValid}
				/>
			</div>
			<div>
				{!pwdFocus && !pwdValid ? (
					pwd === "" ? (
						<p className="register__errorMsg">Kötelező</p>
					) : (
						<p className="register__errorMsg">Jelszó érvénytelen</p>
					)
				) : (
					<></>
				)}
				{pwdFocus ? (
					<p className="editUserFormData__instructions">
						8-24 karakter.
						<br />
						Tartalmaznia kell kis- és nagybetűket, számot és speciális
						karaktert.
						<br />
						Engedélyezett speciális karakterek: ! @ # $ %
					</p>
				) : (
					<></>
				)}
			</div>
			<div>
				<p>Jelszó megerősítése</p>
			</div>
			<div>
				<Input
					key={0}
					ref={repeatPwdRef}
					onFocus={handleRepeatPwdMouseFocus}
					onBlur={handleRepeatPwdMouseBlur}
					onChange={handleRepeatPwdChange}
					value={repeatPwd}
					focus={repeatPwdFocus}
					error={!repeatPwdValid}
				/>
			</div>
			<div>
				{!repeatPwdValid ? (
					repeatPwd === "" ? (
						<p className="register__errorMsg">Kötelező</p>
					) : (
						<p className="register__errorMsg">A jelszavak nem egyeznek meg.</p>
					)
				) : (
					<></>
				)}
			</div>
			<div>
				<button
					className={
						"register__button" + (hover ? " register__button_hover" : "")
					}
					onClick={handleClick}
					onMouseOver={() => {
						setHover(true);
					}}
					onMouseOut={() => {
						setHover(false);
					}}
				>
					Folytasd
				</button>
			</div>
		</form>
	);
};

export default Register;
