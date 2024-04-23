import { mapDataToProduct } from "./productsApi.ts";

const addFavoritesLink = async (offerID, axiosPrivate) => {
	try {
		await axiosPrivate.post("/favorite", {
			offerID,
		});
	} catch (err) {
		console.log(err);
	}
};

const deleteFavoritesLink = async (offerID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.delete("/favorite", {
			params: { offerID },
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getFavoriteOffers = async (axiosPrivate) => {
	const response = await axiosPrivate.get("/favorite");
	const offers = response.data.map((offer: any) => {
		return {
			product: mapDataToProduct(offer),
			id: offer.offerid,
			price: offer.price,
			name: offer.username,
		};
	});

	return offers;
};

export default { addFavoritesLink, getFavoriteOffers, deleteFavoritesLink };
