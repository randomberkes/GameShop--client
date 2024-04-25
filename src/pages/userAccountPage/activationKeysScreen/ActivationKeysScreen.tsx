import React, { useEffect, useState } from "react";
import "./activationKeysScreen.css";
import activationKeyApi from "../../../api/activationKeyApi.ts";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.ts";
import GameCard from "../../../components/gameCard/GameCard.tsx";

const ActivationKeysScreen = () => {
	const [ownerLinks, setOwnerLinks] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	useEffect(() => {
		const getOwnerLinks = async () => {
			const ownerLinks = await activationKeyApi.getOwnerLinks(axiosPrivate);
			console.log(ownerLinks);
			setOwnerLinks(ownerLinks);
		};
		getOwnerLinks();
	}, []);

	const createGameCard = (ownerLink) => {
		return <GameCard ownerID={ownerLink.id} productID={ownerLink.productID} />;
	};
	return (
		<div>
			<div className="activationKeysScreen__header-container">
				<h2>Játékaim</h2>
			</div>
			<div>{ownerLinks.map(createGameCard)}</div>
		</div>
	);
};

export default ActivationKeysScreen;
