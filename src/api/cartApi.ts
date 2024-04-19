import { mapDataToProduct } from "./productsApi.ts";

const addCartLink = async (productID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.post("/cart", {
			productID,
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

const deleteCartLink = async (productID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.delete("/cart", {
			params: { productID },
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

const getCartProducts = async (axiosPrivate) => {
	const response = await axiosPrivate.get("/cart");
	const products = response.data.map((data) => {
		return mapDataToProduct(data);
	});
	return products;
};

export default {
	addCartLink,
	deleteCartLink,
	getCartProducts,
	incrementCartProductAmount,
	decrementCartProductAmount,
	getAmountOfCartProduct,
};
