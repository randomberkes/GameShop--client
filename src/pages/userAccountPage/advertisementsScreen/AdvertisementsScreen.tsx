import React, { useEffect, useState } from "react";
import "./advertisementsScreen.css";
import offerApi from "../../../api/offerApi.ts";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.ts";
import AdvertisementCard from "../../../components/advertisementCard/AdvertisementCard.tsx";
import UserMenuBar from "../../../components/userMenuBar/userMenuBar.tsx";

const AdvertisementsScreen = () => {
	const [offers, setOffers] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	useEffect(() => {
		const getOwnerLinks = async () => {
			const offers = await offerApi.getOffersByUSer(axiosPrivate);
			console.log(offers);
			setOffers(offers);
		};
		getOwnerLinks();
	}, []);

	const createAdvertisementCard = (offer) => {
		return <AdvertisementCard offer={offer} />;
	};
	return (
		<div>
			<div className="advertisementsScreen__header-container">
				<h2>Hirdetéseim</h2>
			</div>
			<div>{offers.map(createAdvertisementCard)}</div>
		</div>
	);
};

export default AdvertisementsScreen;
