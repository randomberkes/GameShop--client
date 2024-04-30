import React, { useEffect, useState } from "react";
import "./paginationBar.css";
import PaginationBarButton from "./paginationBarButton/PaginationBarButton.tsx";

const PaginationBar = (props) => {
	const { totalPageNumber, setPage, page } = props;
	const [paginationButtons, setPaginationButtons] = useState<any[]>([]);

	useEffect(() => {
		let list: any[] = [];
		for (var i = 1; i <= totalPageNumber; i++) {
			list.push(i);
		}
		setPaginationButtons(list);
	}, [totalPageNumber]);

	const createPaginationButton = (number, index) => {
		return (
			<PaginationBarButton setPage={setPage} number={number} page={page} />
		);
	};

	return (
		<div className="paginationBar__container">
			<button
				className="paginationBar__button"
				onClick={() => {
					setPage(1);
				}}
			>
				Első
			</button>
			{paginationButtons.map(createPaginationButton)}
			<button
				className="paginationBar__button"
				onClick={() => {
					setPage(paginationButtons[paginationButtons.length - 1]);
				}}
			>
				Utolsó
			</button>
		</div>
	);
};

export default PaginationBar;
