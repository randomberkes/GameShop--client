import React, { useEffect, useRef, useState } from "react";
import "./newAdvertisementCard.css";
import { Collapse } from "@mui/material";
import activationKeyApi from "../../api/activationKeyApi.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";

const ACTIVATION_KEY_REGEX = /^\d{4}-\d{4}-\d{4}-\d{4}/;

const NewAdvertisementCard = (props) => {
	const [color, setColor] = useState("");
	const [icon, setIcon] = useState("");
	const [open, setOpen] = useState(false);
	const axiosPrivate = useAxiosPrivate();

	const activationKeyRef = useRef<HTMLInputElement>(null);
	const [activationKeyValid, setActivationKeyValid] = useState(true);
	const [activationKeyFocus, setActivationKeyFocus] = useState(false);
	const [activationKey, setActivationKey] = useState("");
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
	const { productID, productPlatform, productName, productImg } = props;
	useEffect(() => {
		if (productPlatform === "PlayStation") {
			setColor(colors.playstationColor);
			setIcon(icons.playstationIcon);
		}
		if (productPlatform === "Xbox") {
			setColor(colors.xboxColor);
			setIcon(icons.xboxIcon);
		}
		if (productPlatform === "PC") {
			setColor(colors.pcColor);
			setIcon(icons.pcIcon);
		}
	}, []);

	const handleActivationKeyMouseFocus = () => {
		setActivationKeyFocus(true);
	};

	const handleActivationKeyMouseBlur = () => {
		setActivationKeyFocus(false);
		const result = ACTIVATION_KEY_REGEX.test(activationKey);
		setActivationKeyValid(result);
	};

	const handleActivationKeyChange = (e) => {
		setActivationKey(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = ACTIVATION_KEY_REGEX.test(activationKey);
		setActivationKeyValid(result);
		if (result) {
			await activationKeyApi.addNewActivationKeyToOffer(
				productID,
				activationKey,
				axiosPrivate
			);
			window.location.reload();
		} else {
			activationKeyRef.current?.focus();
		}
	};
	return (
		<div className="newAdvertisementCard__container">
			<div
				className={
					"newAdvertisementCard__header-container" +
					(open ? " newAdvertisementCard__header-container_open" : "")
				}
				style={{ backgroundColor: `${color}` }}
				onClick={() => {
					setOpen((prev) => {
						return !prev;
					});
				}}
			>
				<img src={productImg} />
				<p>{productName}</p>
				<i className={`bi ${icon}`}></i>
			</div>
			<Collapse in={open}>
				<form
					className="newAdvertisementCard__collapsible"
					style={{ border: `2px solid ${color}` }}
				>
					<div>
						<input
							ref={activationKeyRef}
							className={
								activationKeyFocus
									? " newAdvertisementCard_input_focus"
									: "" +
									  (!activationKeyValid
											? " newAdvertisementCard_input_err"
											: "")
							}
							style={{ border: `2px solid ${color}`, padding: "0px 5px" }}
							placeholder="XXXX-XXXX-XXXX-XXXX"
							onFocus={handleActivationKeyMouseFocus}
							onBlur={handleActivationKeyMouseBlur}
							onChange={handleActivationKeyChange}
							value={activationKey}
						></input>
						{!activationKeyValid ? (
							<p style={{ color: "red", margin: "5px 5px" }}>
								helytelen formátum
							</p>
						) : (
							<></>
						)}
					</div>
					<button
						style={{ border: `2px solid ${color}`, color: color }}
						onClick={handleSubmit}
					>
						hozzá ad
					</button>
				</form>
			</Collapse>
		</div>
	);
};

export default NewAdvertisementCard;
