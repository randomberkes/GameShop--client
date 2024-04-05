import React, { useState } from "react";
import "./searchBar.css";
import productsApi from "../../../api/productsApi.ts";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../Redux/productsSlice.ts";

function SearchBar(props) {
	const { showSearchBar, setShowSearchBar, inputRef } = props;
	const dispatch = useDispatch();
	const [focus, setFocus] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const handleOnFocus = () => {
		setFocus(true);
	};
	const handleOnBlur = () => {
		setFocus(false);

		if (window.innerWidth < 600) setShowSearchBar(false);
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
		dispatch(setProducts(productListData));
	};

	return (
		<form
			role="search"
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			className={`searchForm ${showSearchBar ? "show" : ""}`}
		>
			<input
				className={` ${focus ? "searchBarOnFocus" : ""} searchBar`}
				value={inputValue}
				onChange={handleInput}
				ref={inputRef}
			/>
			<button
				className={` ${focus ? "searchButtonOnFocus" : ""} searchButton`}
				type="submit"
				onClick={handleClick}
			>
				<i className="bi bi-search"></i>
			</button>
		</form>
	);
}

export default SearchBar;
