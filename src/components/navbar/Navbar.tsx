import "./navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useRef, useState } from "react";
import NavbarButton from "./navbarButton/NavbarButton.tsx";
import SearchBar from "./searchBar/SearchBar.tsx";
import SideNavbar from "./sideNavBar/SideNavbar.tsx";
import { Link, useLocation } from "react-router-dom";
import UserButtonIcon from "./navbarButton/userButtonIcon/UserButtonIcon.tsx";
import UserCollapsible from "./navbarButton/userCollapsible/UserCollapsible.tsx";

function Navbar() {
	const inputRef = useRef<HTMLInputElement>(null);
	const location = useLocation();

	let [showSearchBar, setShowSearchBar] = useState(false);

	const navbarButtonsData = [
		{
			icon: <i className="bi bi-list"></i>,
			link: "/products",
			label: "",
		},
		{
			icon: <UserButtonIcon />,
			link: "/user/myAccount",
			label: "Saját fiók",
			collapsible: <UserCollapsible />,
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
		if (index !== 0) {
			return (
				<NavbarButton
					key={index}
					showSearchBar={showSearchBar}
					label={navbarBUttonData.label}
					link={navbarBUttonData.link}
					icon={navbarBUttonData.icon}
					collapsible={navbarBUttonData.collapsible}
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
		<nav className="nav">
			<SideNavbar
				showSearchBar={showSearchBar}
				icon={navbarButtonsData[0].icon}
			/>
			<Link
				to={"/products"}
				className={`nav_logo ${showSearchBar ? "hideButton" : ""}`}
			>
				GameShop
			</Link>

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

			<div>{navbarButtonsData.map(createNavbarButton)}</div>
		</nav>
	);
}

export default Navbar;
