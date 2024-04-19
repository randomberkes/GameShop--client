// import API from "./api.ts";

import { mapDataToProduct } from "./productsApi.ts";

const addFavoritesLink = async (productID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.post("/favorite", {
			productID,
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const deleteFavoritesLink = async (productID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.delete("/favorite", {
			params: { productID },
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getFavoriteProducts = async (axiosPrivate) => {
	const response = await axiosPrivate.get("/favorite");
	const products = response.data.map((data) => {
		return mapDataToProduct(data);
	});
	return products;
};

export default { addFavoritesLink, getFavoriteProducts, deleteFavoritesLink };
