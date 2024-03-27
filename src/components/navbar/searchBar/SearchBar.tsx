import React, { useContext, useState } from "react";
import "./searchBar.css";
import axios from "axios";
import { MyContext } from "../../../Context.ts";
import productsApi from "../../../api/productsApi.ts";

function SearchBar() {
	const { productsContext } = useContext(MyContext);
	const { setProducts } = productsContext;
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
		getProductsByName(inputValue);
		event.preventDefault();
	};

	const getProductsByName = async (inputValue) => {
		const productListData = await productsApi.getProductsByName(inputValue);
		setProducts(productListData);
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
