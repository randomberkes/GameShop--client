import { Collapse } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Product } from '../../../DTO/product.ts';
import offerApi from '../../../api/offerApi.ts';
import productsApi from '../../../api/productsApi.ts';
import AdvertisementCard from '../../../components/advertisementCard/AdvertisementCard.tsx';
import NewAdvertisementCard from '../../../components/newAdvertisementCard/NewAdvertisementCard.tsx';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.ts';
import './advertisementsScreen.css';

const AdvertisementsScreen = () => {
	const [offers, setOffers] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	const [hover, setHover] = useState(false);
	const [open, setOpen] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const getOwnerLinks = async () => {
			const offers = await offerApi.getOffersByUSer(axiosPrivate);
			setOffers(offers);
		};
		getOwnerLinks();
	}, []);

	const createAdvertisementCard = (offer) => {
		return <AdvertisementCard offer={offer} />;
	};

	const createNewAdvertisementCard = (product: any, index: any) => {
		return (
			<NewAdvertisementCard
				productPlatform={product.platform}
				key={index}
				productName={product.name}
				productImg={product.imgPath}
				productID={product.id}
			/>
		);
	};

	const handleClick = async () => {
		const products = await productsApi.getProductsForNewOffer(axiosPrivate);
		setOpen((prev) => {
			return !prev;
		});
		setProducts(products);
	};
	return (
		<div>
			<div className="advertisementsScreen__header-container">
				<h2>Hirdetéseim</h2>
			</div>
			<div
				className={
					'advertisementsScreen__menu-container' +
					(open ? ' advertisementsScreen__menu-container_open' : '')
				}
			>
				<button
					className={
						'advertisementsScreen__add-advertisement-button' +
						(hover
							? ' advertisementsScreen__add-advertisement-button_hover'
							: '')
					}
					onMouseOver={() => {
						setHover(true);
					}}
					onMouseOut={() => {
						setHover(false);
					}}
					onClick={() => {
						handleClick();
					}}
				>
					<i className="bi bi-plus"></i>
				</button>
			</div>
			<Collapse
				in={open}
				className="advertisementsScreen__collapsible-container"
			>
				{products.map(createNewAdvertisementCard)}
			</Collapse>
			<div>{offers.map(createAdvertisementCard)}</div>
		</div>
	);
};

export default AdvertisementsScreen;
