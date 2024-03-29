import "bootstrap/dist/css/bootstrap.css";
import "./navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import NavbarButton from "./navbarButton/NavbarButton.tsx";
import SearchBar from "./searchBar/SearchBar.tsx";
import { Link } from "react-router-dom";

function Navbar() {
	const navbarBUttonsData = [
		{
			icon: <i className="bi bi-list"></i>,
			link: "/products",
		},
		{
			icon: <i className="bi bi-person"></i>,
			link: "/products",
		},
		{
			icon: <i className="bi bi-heart"></i>,
			link: "/favorites",
		},
		{
			icon: <i className="bi bi-cart"></i>,
			link: "/cart",
		},
	];

	const createNavbarButton = (navbarBUttonData, index) => {
		if (index != 0) {
			return (
				<NavbarButton
					link={navbarBUttonData.link}
					icon={navbarBUttonData.icon}
				/>
			);
		}
	};

	return (
		<nav className=" container-fluid">
			<div className="row align-items-center">
				<div className="col-2 container-fluid">
					<div className="row">
						<NavbarButton
							link={navbarBUttonsData[0].link}
							icon={navbarBUttonsData[0].icon}
						/>

						<div className="col-8 row align-items-center" id="logo">
							Logo
						</div>
					</div>
				</div>
				<div className="col-7">
					<SearchBar />
				</div>
				<div className="col-2 container-fluid">
					<div className="row align-items-center justify-content-end">
						{navbarBUttonsData.map(createNavbarButton)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
