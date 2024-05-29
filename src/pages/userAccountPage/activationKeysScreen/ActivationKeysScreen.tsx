import React, { useEffect, useState } from 'react';
import activationKeyApi from '../../../api/activationKeyApi.ts';
import GameCard from '../../../components/gameCard/GameCard.tsx';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.ts';
import './activationKeysScreen.css';

const ActivationKeysScreen = () => {
	const [ownerLinks, setOwnerLinks] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	useEffect(() => {
		const getOwnerLinks = async () => {
			const ownerLinks = await activationKeyApi.getOwnerLinks(axiosPrivate);
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
