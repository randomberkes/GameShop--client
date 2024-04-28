import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";

const ActivationKeyCard = (props) => {
	const { activationKey, productID, handleClick } = props;

	const axiosPrivate = useAxiosPrivate();
	console.log(productID);
	const click = () => {
		handleClick(productID, activationKey.id, axiosPrivate);
	};
	return (
		<div>
			{activationKey.activationKey}
			<button onClick={click}>add</button>
		</div>
	);
};

export default ActivationKeyCard;
