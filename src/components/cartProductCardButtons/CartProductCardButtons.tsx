import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	decreaseCountOfProduct,
	deleteOfferFromCart,
	increaseCountOfProduct,
	updatePrice,
} from '../../Redux/offerSlice.ts';
import { RootState } from '../../Redux/store.ts';
import cartApi from '../../api/cartApi.ts';
import offerApi from '../../api/offerApi.ts';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.ts';
import ProductCardButton from '../productCardButton/ProductCardButton.tsx';
import './cartProductCardButtons.css';

const CartProductCardButtons = (props) => {
	const { authUser } = useSelector((state: RootState) => state.auth);
	const [activationKeyNumber, setActivationKeyNumber] = useState(0);
	const dispatch = useDispatch();
	const { price, offerID, amount } = props;
	const axiosPrivate = useAxiosPrivate();
	const icons = [<i className="bi bi-trash3"></i>];

	useEffect(() => {
		const getOfferActivationKeyNumber = async () => {
			const activationKeyNumber = await offerApi.getOfferActivationKeyNumber(
				offerID
			);
			setActivationKeyNumber(activationKeyNumber);
		};
		getOfferActivationKeyNumber();
	}, []);

	useEffect(() => {
		dispatch(updatePrice());
	}, [amount]);

	useEffect(() => {});

	const handleDeleteButtonClick = async () => {
		if (authUser.name === '') {
			dispatch(deleteOfferFromCart(offerID));
		} else {
			await cartApi.deleteCartLink(offerID, axiosPrivate);
			dispatch(deleteOfferFromCart(offerID));
		}
	};

	const handlePlusButtonClick = async () => {
		if (authUser.name === '') {
			dispatch(increaseCountOfProduct(offerID));
		} else {
			await cartApi.incrementCartProductAmount(offerID, axiosPrivate);
			dispatch(increaseCountOfProduct(offerID));
		}
	};
	const handleMinusButtonClick = async () => {
		if (authUser.name === '') {
			dispatch(decreaseCountOfProduct(offerID));
		} else {
			await cartApi.decrementCartProductAmount(offerID, axiosPrivate);
			dispatch(decreaseCountOfProduct(offerID));
		}
	};

	return (
		<div className="cartProductCardButtons_Container">
			<div>
				<span className="cartProductCardButtons_price">{price}ft</span>
			</div>
			<div>
				<button
					className="plusMinusButton"
					disabled={amount === 1}
					onClick={handleMinusButtonClick}
				>
					<i className="bi bi-dash plusMinusIcon"></i>
				</button>
				<span>{amount}</span>
				<button
					className="plusMinusButton"
					onClick={handlePlusButtonClick}
					disabled={amount == activationKeyNumber}
				>
					<i className="bi bi-plus plusMinusIcon"></i>
				</button>
			</div>

			<div>
				<ProductCardButton
					handleClick={handleDeleteButtonClick}
					icon={icons[0]}
				/>
			</div>
		</div>
	);
};

export default CartProductCardButtons;
