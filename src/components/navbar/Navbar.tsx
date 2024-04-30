import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../Redux/store.ts";
import NavbarButtonAmountIndicator from "../navbarButtonAmountIndicator/NavbarButtonAmountIndicator.tsx";
import "./navbar.css";
import NavbarButton from "./navbarButton/NavbarButton.tsx";
import UserButtonIcon from "./navbarButton/userButtonIcon/UserButtonIcon.tsx";
import UserCollapsible from "./navbarButton/userCollapsible/UserCollapsible.tsx";
import SearchBar from "./searchBar/SearchBar.tsx";
import SideNavbar from "./sideNavBar/SideNavbar.tsx";
import { setCartOffers, setFavoriteOffers } from "../../Redux/offerSlice.ts";
import favoritesApi from "../../api/favoritesApi.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import cartApi from "../../api/cartApi.ts";

function Navbar() {
	const inputRef = useRef<HTMLInputElement>(null);
	const location = useLocation();

	const [showSearchBar, setShowSearchBar] = useState(false);
	const { authUser } = useSelector((state: RootState) => state.auth);
	const { favoriteOffers, cartOffers } = useSelector(
		(state: RootState) => state.offers
	);
	const dispatch = useDispatch();
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		const getFavoriteOffers = async () => {
			try {
				const offers = await favoritesApi.getFavoriteOffers(axiosPrivate);

				dispatch(setFavoriteOffers(offers));
			} catch (err) {
				console.log(err);
				dispatch(setFavoriteOffers([]));
			}
		};
		const getCartOffers = async () => {
			try {
				const offers = await cartApi.getCartOffers(axiosPrivate);

				dispatch(setCartOffers(offers));
			} catch (err) {
				console.log(err);
				dispatch(setCartOffers([]));
			}
		};
		if (authUser.name !== "") getCartOffers();
		if (authUser.name !== "") getFavoriteOffers();
	}, []);
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
			collapsible: authUser.name !== "" ? <UserCollapsible /> : <></>,
		},
		{
			icon: <i className="bi bi-heart"></i>,
			link: "/favorites",
			label: "Kedvencek",
			amountIndicator:
				favoriteOffers.length > 0 ? (
					<NavbarButtonAmountIndicator amount={favoriteOffers.length} />
				) : (
					<></>
				),
		},
		{
			icon: <i className="bi bi-cart"></i>,
			link: "/cart",
			label: "Kosár",
			amountIndicator:
				cartOffers.length > 0 ? (
					<NavbarButtonAmountIndicator amount={cartOffers.length} />
				) : (
					<></>
				),
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
					amountIndicator={navbarBUttonData.amountIndicator}
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
