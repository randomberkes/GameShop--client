import React from 'react';
import './input.css';

const Input = React.forwardRef<HTMLInputElement, any>((props, ref) => {
	const { onFocus, onBlur, onChange, value, error, focus } = props;

	return (
		<div className="input-container">
			<input
				className={
					'register__input' +
					(error ? ' register__input_invalid' : '') +
					(focus ? ' register__input_focus' : '')
				}
				value={value}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={onChange}
				id="0"
				ref={ref}
			></input>
			<div
				className={
					'register__input_icon-container' +
					(error ? ' register__input_icon-container_invalid' : '') +
					(focus ? ' register__input_icon-container_focus' : '')
				}
			>
				<i className="bi bi-cone register__input_icon"></i>
			</div>
		</div>
	);
});

export default Input;
