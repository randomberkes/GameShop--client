import React, { useEffect, useState } from "react";
import "./advertisementCard.css";
import ActivationKeyCard from "../activationKeyCard/ActivationKeyCard.tsx";
import activationKeyApi from "../../api/activationKeyApi.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";

const AdvertisementCard = (props) => {
	const { offer } = props;
	const [color, setColor] = useState("");
	const [icon, setIcon] = useState("");
	const axiosPrivate = useAxiosPrivate();
	const [activationKeys, setActivationKeys] = useState([]);
	const colors = {
		playstationColor: "#006fcd",
		xboxColor: "#107c10",
		pcColor: "#e72929",
	};
	const icons = {
		playstationIcon: "bi-playstation",
		xboxIcon: "bi-xbox",
		pcIcon: "#107C10",
	};
	useEffect(() => {
		const getActivationKeys = async () => {
			const activationKeys = await activationKeyApi.getActivationKeysByUser(
				offer.offerID,
				axiosPrivate
			);
			console.log(activationKeys);
			setActivationKeys(activationKeys);
		};
		getActivationKeys();
	}, []);
	useEffect(() => {
		if (offer.platform === "PlayStation") {
			setColor(colors.playstationColor);
			setIcon(icons.playstationIcon);
		}
		if (offer.platform === "Xbox") {
			setColor(colors.xboxColor);
			setIcon(icons.xboxIcon);
		}
		if (offer.platform === "PC") {
			setColor(colors.xboxColor);
			setIcon(icons.xboxIcon);
		}
	});
	const handleClick = async (productID, axtivationKeyID, axiosPrivate) => {
		await activationKeyApi.addActivationKeyToOwner(
			productID,
			axtivationKeyID,
			axiosPrivate
		);
	};

	const createActivationKeyCard = (activationKey) => {
		return (
			<ActivationKeyCard
				activationKey={activationKey}
				productID={offer.id}
				handleClick={handleClick}
			/>
		);
	};
	return (
		<div
			className="advertiesementCard__container"
			style={{ border: `2px solid ${color}` }}
		>
			<div
				className="advertiesementCard__header-container"
				style={{ backgroundColor: color }}
			>
				<p>{offer.name}</p>
				<i className={`bi ${icon}`}></i>
			</div>
			<div className="advertiesementCard__content-container">
				<div>
					<img src={offer.imgPath}></img>
				</div>
				<div>{offer.price}</div>
				<div>
					<div>{activationKeys.map(createActivationKeyCard)}</div>
				</div>
			</div>
		</div>
	);
};

export default AdvertisementCard;
