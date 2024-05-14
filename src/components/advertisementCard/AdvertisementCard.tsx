import React, { useEffect, useState } from "react";
import activationKeyApi from "../../api/activationKeyApi.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import ActivationKeyCard from "../activationKeyCard/ActivationKeyCard.tsx";
import "./advertisementCard.css";
import offerApi from "../../api/offerApi.ts";

const AdvertisementCard = (props) => {
	const { offer } = props;
	const [color, setColor] = useState("");
	const [icon, setIcon] = useState("");
	const axiosPrivate = useAxiosPrivate();
	const [activationKeys, setActivationKeys] = useState([]);
	const [hover, setHover] = useState(false);
	const [price, setPrice] = useState("");
	const [disabled, setDisabled] = useState(true);
	const colors = {
		playstationColor: "#006fcd",
		xboxColor: "#107c10",
		pcColor: "#e72929",
	};
	const icons = {
		playstationIcon: "bi-playstation",
		xboxIcon: "bi-xbox",
		pcIcon: "bi-pc",
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
			setColor(colors.pcColor);
			setIcon(icons.pcIcon);
		}
	});
	const handleClick = async (productID, axtivationKeyID, axiosPrivate) => {
		await activationKeyApi.addActivationKeyToOwner(
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
				productID={offer.id}
				text={"eltávolít"}
				icon={<i className="bi bi-trash3-fill"></i>}
				color={"#ff0000"}
				handleClick={handleClick}
				borderColor={color}
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
				<div
					className={
						offer.price == 0
							? "advertiesementCard__status-container_inactive"
							: "advertiesementCard__status-container_active"
					}
				>
					<p>{offer.price == 0 ? "Inaktív" : "Aktív"}</p>
				</div>
				<div>
					<img src={offer.imgPath}></img>
				</div>

				<form className="advertiesementCard__price-container">
					<input
						type="text"
						placeholder={`${offer.price} Ft`}
						disabled={disabled}
						onChange={(e) => {
							setPrice(e.target.value);
						}}
						value={price}
						style={{ border: `2px solid ${color}` }}
					></input>
					<button
						style={
							!hover
								? { backgroundColor: color }
								: { backgroundColor: `${color}90` }
						}
						onMouseOver={() => {
							setHover(true);
						}}
						onMouseOut={() => {
							setHover(false);
						}}
						onClick={async (e) => {
							e.preventDefault();
							setDisabled((prev) => {
								return !prev;
							});
							if (!disabled) {
								await offerApi.updateOfferPrice(
									axiosPrivate,
									offer.offerID,
									price
								);
								window.location.reload();
							}
						}}
					>
						{disabled ? (
							<i className="bi bi-pencil-fill"></i>
						) : (
							<i className="bi bi-check-lg"></i>
						)}
					</button>
				</form>
				<div>
					<div>{activationKeys.map(createActivationKeyCard)}</div>
				</div>
			</div>
		</div>
	);
};

export default AdvertisementCard;
