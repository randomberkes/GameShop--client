import API from "./api.ts";

const getOffers = async (productID: any) => {
	try {
		const response = await API.axiosPublic.get("/offer", {
			params: { productID },
		});
		const offers = response.data;
		return offers;
	} catch (err) {
		console.log(err);
	}
};

const getOffersByUSer = async (axiosPrivate: any) => {
	try {
		const response = await axiosPrivate.get("/offer/byUser");
		const offers = response.data;
		return offers;
	} catch (err) {
		console.log(err);
	}
};

const updateOfferPrice = async (
	axiosPrivate: any,
	offerID: any,
	newPrice: any
) => {
	try {
		await axiosPrivate.patch("/offer", { offerID, newPrice });
	} catch (err) {
		console.log(err);
	}
};

const getOfferActivationKeyNumber = async (offerID: any) => {
	try {
		const response = await API.axiosPublic.get("offer/amount", {
			params: { offerID },
		});
		const activationKeyNumber = response.data.count;
		console.log(activationKeyNumber);
		return activationKeyNumber;
	} catch (err) {
		console.log(err);
	}
};

export default {
	getOffers,
	getOfferActivationKeyNumber,
	getOffersByUSer,
	updateOfferPrice,
};
