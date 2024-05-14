import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import "./activationKeyCard.css";

const ActivationKeyCard = (props) => {
	const {
		activationKey,
		productID,
		handleClick,
		text,
		icon,
		color,
		borderColor,
	} = props;
	const [hover, setHover] = useState(false);

	const axiosPrivate = useAxiosPrivate();
	console.log(productID);
	const click = () => {
		handleClick(productID, activationKey.id, axiosPrivate);
	};
	return (
		<div
			className="activationKeyCard__container"
			style={{ border: `2px solid ${borderColor}` }}
		>
			<p className="activationKeyCard__activation-key-container">
				{activationKey.activationKey}
			</p>
			<button
				onMouseOver={() => {
					setHover(true);
				}}
				onMouseOut={() => {
					setHover(false);
				}}
				onClick={click}
				style={
					!hover
						? { backgroundColor: color }
						: { backgroundColor: `${color}90` }
				}
			>
				{text}
				{icon}
			</button>
		</div>
	);
};

export default ActivationKeyCard;
