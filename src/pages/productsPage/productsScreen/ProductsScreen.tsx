import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../../DTO/product.ts';
import { setProducts } from '../../../Redux/productsSlice.ts';
import { RootState } from '../../../Redux/store.ts';
import productsApi from '../../../api/productsApi.ts';
import PaginationBar from '../../../components/paginationBar/PaginationBar.tsx';
import ProductCard from '../../../components/productCard/ProductCard.tsx';
import ProductsBar from '../../../components/productsBar/ProductsBar.tsx';
import './productsScreen.css';

function ProductsScreen() {
	const { products } = useSelector((state: RootState) => state.products);

	const [page, setPage] = useState(1);
	const [totalPageNumber, setTotalPageNumber] = useState(1);

	const dispatch = useDispatch();
	const { filter } = useSelector((state: RootState) => state.products);

	const getProductsByFilter = async () => {
		const productListData = await productsApi.getProductsByFilter(
			filter,
			page,
			2
		);

		setTotalPageNumber(productListData.totalPageNumber);
		dispatch(setProducts(productListData.productListData));
	};

	useEffect(() => {
		getProductsByFilter();
	}, [filter, page]);
	const createCard = (
		productData: Product,
		index: number
	): React.JSX.Element => {
		return <ProductCard key={index} productData={productData} />;
	};

	return (
		<div>
			<ProductsBar />
			{products.map((product, index) => {
				return createCard(product, index);
			})}
			<PaginationBar
				totalPageNumber={totalPageNumber}
				setPage={setPage}
				page={page}
			/>
		</div>
	);
}

export default ProductsScreen;
