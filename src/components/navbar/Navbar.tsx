import "bootstrap/dist/css/bootstrap.css";
import "./navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useRef, useState } from "react";
import NavbarButton from "./navbarButton/NavbarButton.tsx";
import SearchBar from "./searchBar/SearchBar.tsx";

function Navbar() {
	const inputRef = useRef<HTMLInputElement>(null);

	let [showSearchBar, setShowSearchBar] = useState(false);
	// let [focus, setFocus] = useState(useRef<HTMLInputElement>(null));

	useEffect(() => {
		console.log("Input Ref on Mount:", inputRef.current);
	}, []);

	const navbarBUttonsData = [
		{
			icon: <i className="bi bi-list"></i>,
			link: "/products",
			label: "",
		},
		{
			icon: <i className="bi bi-person"></i>,
			link: "/products",
			label: "Saját fiók",
		},
		{
			icon: <i className="bi bi-heart"></i>,
			link: "/favorites",
			label: "Kedvencek",
		},
		{
			icon: <i className="bi bi-cart"></i>,
			link: "/cart",
			label: "Kosár",
		},
	];

	const createNavbarButton = (navbarBUttonData, index) => {
		if (index != 0) {
			return (
				<NavbarButton
					showSearchBar={showSearchBar}
					label={navbarBUttonData.label}
					link={navbarBUttonData.link}
					icon={navbarBUttonData.icon}
				/>
			);
		}
	};

	const handleClick = () => {
		setShowSearchBar(true);
		if (inputRef.current) {
			setTimeout(() => {
				inputRef.current!.focus();
			}, 0);
		}
	};

	return (
		<nav>
			<div className={`${showSearchBar ? "hideButton" : ""}`} id="logo">
				Logo
			</div>

			<SearchBar
				inputRef={inputRef}
				showSearchBar={showSearchBar}
				setShowSearchBar={setShowSearchBar}
			/>

			<button
				className={`"navButtonContainer displaySearchBarButton navbarButton ${
					showSearchBar ? "hideButton" : ""
				}`}
				onClick={handleClick}
			>
				<i className="bi bi-search "></i>
			</button>

			<div>{navbarBUttonsData.map(createNavbarButton)}</div>
		</nav>
	);
}

export default Navbar;
