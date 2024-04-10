import React, { useState } from "react";
import "./input.css";

const Input = (props) => {
	const [focus, setFocus] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const {
		inputValue,
		handleInputChange,
		validationList,
		error,
		setError,
		id,
		inputRef,
	} = props;

	const handleOnFocus = (event) => {
		setFocus(true);
	};
	const handleOnBlur = (event) => {
		setError(id, false);

		validationList.forEach((element) => {
			const message = element(id, event);

			if (message.length !== 0) setErrorMessage(message);
		});
		setFocus(false);
	};

	const handleChange = (event) => {
		handleInputChange(event);
	};

	return (
		<div>
			<div className="input-container">
				<input
					className={
						"register__input" +
						(error ? " register__input_invalid" : "") +
						(focus ? " register__input_focus" : "")
					}
					value={inputValue}
					onFocus={handleOnFocus}
					onBlur={handleOnBlur}
					onChange={handleChange}
					required
					id="0"
					ref={inputRef}
				></input>
				<div
					className={
						"register__input_icon-container" +
						(error ? " register__input_icon-container_invalid" : "") +
						(focus ? " register__input_icon-container_focus" : "")
					}
				>
					<i className="bi bi-cone register__input_icon"></i>
				</div>
			</div>
			<p
				className={
					"register__input_p" + (error ? " register__input_p_invalid" : "")
				}
			>
				{errorMessage}
			</p>
		</div>
	);
};

export default Input;
