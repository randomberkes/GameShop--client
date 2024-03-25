import "bootstrap/dist/css/bootstrap.css";
import "./navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import NavbarButton from "./navbarButton/NavbarButton.tsx";
import SearchBar from "./searchBar/SearchBar.tsx";

function Navbar() {
	const icons = [
		<i className="bi bi-list"></i>,
		<i className="bi bi-person"></i>,
		<i className="bi bi-heart"></i>,
		<i className="bi bi-cart"></i>,
		,
	];

	return (
		<nav className=" container-fluid">
			<div className="row align-items-center">
				<div className="col-2 container-fluid">
					<div className="row">
						<NavbarButton icon={icons[0]} />
						<div className="col-8 row align-items-center" id="logo">
							Logo
						</div>
					</div>
				</div>
				<SearchBar />
				<div className="col-2 container-fluid">
					<NavbarButton icon={icons[1]} />
					<NavbarButton icon={icons[2]} />
					<NavbarButton icon={icons[3]} />
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
