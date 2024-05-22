import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../Redux/store.ts';
import useLogout from '../../../../hooks/useLogout.ts';
import CollapsibleButton from './collapsibleButton/CollapsibleButton.tsx';
import './userCollapsible.css';

const UserCollapsible = () => {
	const navigate = useNavigate();
	const logout = useLogout();
	const signOut = () => {
		logout();
	};
	const buttons = [
		{
			text: 'Saját fiók',
			onClick: () => {
				navigate('/user/myAccount');
			},
		},
		{
			text: 'Hirdetéseim',
			onClick: () => {
				navigate('/user/advertisements');
			},
		},
		{
			text: 'Vásárlások',
			onClick: () => {
				navigate('/user/purchases');
			},
		},
		{
			text: 'Játékaim',
			onClick: () => {
				navigate('/user/activationKeys');
			},
		},
		{ text: 'Kijelentkezés', onClick: signOut },
	];

	const createButton = (button) => {
		return <CollapsibleButton text={button.text} onClick={button.onClick} />;
	};

	const { authUser } = useSelector((state: RootState) => state.auth);

	return authUser.name !== '' ? (
		<div className="collapsible__container">
			<h5 className="collapsible__header">{`Hello ${authUser.name}`}</h5>
			{buttons.map(createButton)}
		</div>
	) : (
		<div>no user</div>
	);
};

export default UserCollapsible;
