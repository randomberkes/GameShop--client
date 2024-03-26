import React, { useContext, useState } from "react";
import "./searchBar.css";
import axios from "axios";
import { ProductsContext } from "../../../Context.ts";

function SearchBar() {
	const { setProducts } = useContext(ProductsContext);
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
		axios
			.get("products/search", { params: { name: inputValue } })
			.then((response) => {
				const productListData = response.data.map((data) => {
					return {
						id: data,
						name: data.name,
						platform: data.platform,
						gameDeviceCompatibility: data.game_device_compatibility,
						gameType: data.game_type,
						ratingPegi: data.rating_pegi,
						numberOfPlayers: data.number_of_players,
						descriptions: data.description,
						price: data.price,
					};
				});
				setProducts(productListData);
			});
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
