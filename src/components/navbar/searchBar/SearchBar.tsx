import React, { useContext, useState } from "react";
import "./searchBar.css";
// import axios from "axios";
// import { MyContext } from "../../../Context.ts";
import productsApi from "../../../api/productsApi.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store.ts";
import { setProducts } from "../../../Redux/productsSlice.ts";

function SearchBar() {
	const { products } = useSelector((state: RootState) => state.products);
	const dispatch = useDispatch();
	// const { productsContext } = useContext(MyContext);
	// const { setProducts } = productsContext;
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
		dispatch(setProducts(productListData));
	};

	return (
		<form role="search" onFocus={handleOnFocus} onBlur={handleOnBlur}>
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
