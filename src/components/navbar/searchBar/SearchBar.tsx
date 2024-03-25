import React, { useState } from "react";
import "./searchBar.css";

function SearchBar() {
	const [focus, setFocus] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const searchBarOnFocus = {
		borderTop: "1px solid #d65a31",
		borderBottom: "1px solid #d65a31",
		borderLeft: "1px solid #d65a31",
		borderRight: "0px",
	};

	const handleOnFocus = () => {
		setFocus(true);
	};
	const handleOnBlur = () => {
		setFocus(false);
	};

	const handleInput = (event) => {
		const { value } = event.target;
		setInputValue(value);
	};

	const handleClick = (event) => {
		console.log(inputValue);
		event.preventDefault();
	};

	return (
		<form
			className="col-8"
			role="search"
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
		>
			<input
				className={` col-11 ${focus ? "searchBarOnFocus" : ""} searchBar`}
				value={inputValue}
				onChange={handleInput}
			/>
			<button
				className={`col-1 ${focus ? "searchButtonOnFocus" : ""} searchButton`}
				type="submit"
				id=""
				onClick={handleClick}
			>
				<i className="bi bi-search"></i>
			</button>
		</form>
	);
}

export default SearchBar;
