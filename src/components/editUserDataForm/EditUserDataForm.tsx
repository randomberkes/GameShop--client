import React, { useRef, useState } from "react";
import "./editUserDataForm.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import usersApi from "../../api/usersApi.ts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store.ts";
import useRefreshToken from "../../hooks/useRefreshToken.ts";

const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const EditUserDataForm = () => {
	const refresh = useRefreshToken();
	const { authUser } = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const pwdRef = useRef<HTMLInputElement>(null);
	const repeatPwdRef = useRef<HTMLInputElement>(null);

	const [nameFocus, setNameFocus] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);
	const [repeatPwdFocus, setRepeatPwdFocus] = useState(false);

	const [nameValid, setNameValid] = useState(true);
	const [emailValid, setEmailValid] = useState(true);
	const [pwdValid, setPwdValid] = useState(true);
	const [repeatPwdValid, setRepeatPwdValid] = useState(true);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [repeatPwd, setRepeatPwd] = useState("");

	const handleNameMouseFocus = () => {
		setNameFocus(true);
	};
	const handleEmailMouseFocus = () => {
		setEmailFocus(true);
	};
	const handlePwdMouseFocus = () => {
		setPwdFocus(true);
	};
	const handleRepeatPwdMouseFocus = () => {
		setRepeatPwdFocus(true);
	};

	const handleNameMouseBlur = () => {
		setNameFocus(false);
		const result = NAME_REGEX.test(name) || name === "";

		setNameValid(result);
	};
	const handleEmailMouseBlur = () => {
		setEmailFocus(false);
		const result = EMAIL_REGEX.test(email) || email === "";

		setEmailValid(result);
	};
	const handlePwdMouseBlur = () => {
		setPwdFocus(false);
		const result = PWD_REGEX.test(pwd) || pwd === "";

		setPwdValid(result);
	};
	const handleRepeatPwdMouseBlur = () => {
		setRepeatPwdFocus(false);

		setRepeatPwdValid(pwd === repeatPwd);
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePwdChange = (e) => {
		setPwd(e.target.value);
	};
	const handleRepeatPwdChange = (e) => {
		setRepeatPwd(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!nameValid) {
			nameRef.current!.focus();
		} else if (!emailValid) {
			emailRef.current!.focus();
		} else if (!pwdValid) {
			pwdRef.current!.focus();
		} else if (!repeatPwdValid) {
			repeatPwdRef.current!.focus();
		} else {
			const newUser = {
				name: name,
				email: email,
				pwd: pwd,
			};
			await usersApi.updateUser(newUser, axiosPrivate);
			refresh();
			navigate("/user/myAccount");
		}
	};

	return (
		<div className="editUserFormData__container">
			<form>
				<div className="editUserFormData__header-container">
					<p style={{ display: "inline-block", color: "black" }}>Adatkezelés</p>
				</div>
				<div className="editUserFormData__label1">
					<label>Vezetéknév és keresztnév:</label>
				</div>
				<div className="editUserFormData__form-err-ms-container">
					<div>
						<input
							ref={nameRef}
							className={nameFocus ? " editUserFormData__input_focus" : ""}
							placeholder={authUser.name}
							onFocus={handleNameMouseFocus}
							onBlur={handleNameMouseBlur}
							onChange={handleNameChange}
							value={name}
						></input>
					</div>
				</div>
				<div className={nameValid ? "" : " err"}>
					{!nameFocus ? (
						<p>Név érvénytelen</p>
					) : (
						<p className="editUserFormData__instructions">
							4-24 karakter.
							<br /> Betűvel kell kezdeni.
							<br /> Betűk, számok, aláhúzásjelek, kötőjelek megengedettek.
						</p>
					)}
				</div>

				<div className="editUserFormData__label2">
					<label>Email:</label>
				</div>
				<div className="editUserFormData__form-err-ms-container">
					<div>
						{" "}
						<input
							ref={emailRef}
							className={emailFocus ? " editUserFormData__input_focus" : ""}
							placeholder={authUser.email}
							onFocus={handleEmailMouseFocus}
							onBlur={handleEmailMouseBlur}
							onChange={handleEmailChange}
							value={email}
						></input>
					</div>
				</div>
				<div className={emailValid ? "" : " err"}>
					{!emailFocus ? <p>Email érvénytelen</p> : <></>}
				</div>

				<div className="editUserFormData__label3">
					<label>Jelszót:</label>
				</div>
				<div className="editUserFormData__form-err-ms-container">
					<div>
						<input
							ref={pwdRef}
							className={pwdFocus ? " editUserFormData__input_focus" : ""}
							onFocus={handlePwdMouseFocus}
							onBlur={handlePwdMouseBlur}
							onChange={handlePwdChange}
							value={pwd}
						></input>
					</div>
				</div>
				<div className={pwdValid ? "" : " err"}>
					{!pwdFocus ? (
						<p>Jelszó érvénytelen</p>
					) : (
						<p className="editUserFormData__instructions">
							8-24 karakter.
							<br />
							Tartalmaznia kell kis- és nagybetűket, számot és speciális
							karaktert.
							<br />
							Engedélyezett speciális karakterek: ! @ # $ %
						</p>
					)}
				</div>

				<div className="editUserFormData__label4">
					<label>Jelszó megerősítése:</label>
				</div>
				<div className="editUserFormData__form-err-ms-container">
					<div>
						<input
							ref={repeatPwdRef}
							className={repeatPwdFocus ? " editUserFormData__input_focus" : ""}
							onFocus={handleRepeatPwdMouseFocus}
							onBlur={handleRepeatPwdMouseBlur}
							onChange={handleRepeatPwdChange}
							value={repeatPwd}
						></input>
					</div>
				</div>
				<div className={repeatPwdValid ? "" : " err"}>
					{!repeatPwdFocus ? (
						repeatPwd === "" && pwd !== "" ? (
							<p>Kötelező</p>
						) : (
							<p>A jelszavak nem egyeznek meg.</p>
						)
					) : (
						<></>
					)}
				</div>

				<div className="editUserFormData__button-container">
					<button className="editUserFormData__button" onClick={handleSubmit}>
						Mentés
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditUserDataForm;
