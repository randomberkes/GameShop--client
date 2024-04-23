import { mapDataToProduct } from "./productsApi.ts";

const addCartLink = async (offerID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.post("/cart", {
			offerID,
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const deleteCartLink = async (offerID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.delete("/cart", {
			params: { offerID },
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getAmountOfCartProduct = async (productID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.get("/cart/amount", {
			params: { productID },
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const incrementCartProductAmount = async (productID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.get("/cart/increment", {
			params: { productID },
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};
const decrementCartProductAmount = async (productID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.get("/cart/decrement", {
			params: { productID },
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const getCartOffers = async (axiosPrivate) => {
	const response = await axiosPrivate.get("/cart");
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

export default {
	addCartLink,
	deleteCartLink,
	getCartOffers,
	incrementCartProductAmount,
	decrementCartProductAmount,
	getAmountOfCartProduct,
};
