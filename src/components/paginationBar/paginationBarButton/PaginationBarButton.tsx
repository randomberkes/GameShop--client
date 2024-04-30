import React from "react";
import "./paginationBarButton.css";
const PaginationBarButton = (props) => {
	const { setPage, number, page } = props;
	return (
		<button
			className={
				"paginationBarButton__button" +
				(page === number ? " paginationBarButton__button-active" : "")
			}
			onClick={() => {
				setPage(number);
			}}
		>
			{number}
		</button>
	);
};

export default PaginationBarButton;
