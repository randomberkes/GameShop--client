import React, { useEffect, useState } from 'react';
import { Product } from '../../DTO/product.ts';
import activationKeyApi from '../../api/activationKeyApi.ts';
import productsApi from '../../api/productsApi.ts';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.ts';
import ActivationKeyCard from '../activationKeyCard/ActivationKeyCard.tsx';
import './gameCard.css';

const GameCard = (props) => {
	const { ownerID, productID } = props;
	const [color, setColor] = useState('');
	const [icon, setIcon] = useState('');
	const [activationKeys, setActivationKeys] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	const [product, setProduct] = useState<Product>({
		id: 0,
		name: '',
		platform: '',
		gameDeviceCompatibility: '',
		gameType: '',
		ratingPegi: '',
		numberOfPlayers: '',
		descriptions: '',
		price: 0,
		imgPath: '',
	});
	const colors = {
		playstationColor: '#006fcd',
		xboxColor: '#107c10',
		pcColor: '#e72929',
	};
	const icons = {
		playstationIcon: 'bi-playstation',
		xboxIcon: 'bi-xbox',
		pcIcon: 'bi-pc',
	};
	useEffect(() => {
		const getActivationKeys = async () => {
			const activationKeys = await activationKeyApi.getActivationKeys(
				ownerID,
				axiosPrivate
			);
			setActivationKeys(activationKeys);
		};

		const getProduct = async () => {
			const product = await productsApi.getProductByID(productID);
			setProduct(product);
		};
		getProduct();
		getActivationKeys();
	}, []);

	useEffect(() => {
		if (product.platform === 'PlayStation') {
			setColor(colors.playstationColor);
			setIcon(icons.playstationIcon);
		}
		if (product.platform === 'Xbox') {
			setColor(colors.xboxColor);
			setIcon(icons.xboxIcon);
		}
		if (product.platform === 'PC') {
			setColor(colors.pcColor);
			setIcon(icons.pcIcon);
		}
	}, [product]);
	const handleClick = async (productID, axtivationKeyID, axiosPrivate) => {
		await activationKeyApi.addActivationKeyToOffer(
			productID,
			axtivationKeyID,
			axiosPrivate
		);
		window.location.reload();
	};

	const createActivationKeyCard = (activationKey) => {
		return (
			<ActivationKeyCard
				activationKey={activationKey}
				productID={product.id}
				text={'meghírdet'}
				icon={<i className="bi bi-currency-dollar"></i>}
				color={'#ffc100'}
				handleClick={handleClick}
				borderColor={color}
			/>
		);
	};

	return (
		<div
			className="gameCard__container"
			style={{ border: `2px solid ${color}` }}
		>
			<div
				className="gameCard__header-container"
				style={{ backgroundColor: color }}
			>
				<p>{product.name}</p>
				<i className={`bi ${icon}`}></i>
			</div>
			<div className="gameCard__content-container">
				<div>
					<img src={product.imgPath}></img>
				</div>
				<div>
					<div>{activationKeys.map(createActivationKeyCard)}</div>
				</div>
			</div>
		</div>
	);
};

export default GameCard;
