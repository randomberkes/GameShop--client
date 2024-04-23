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

export default { getOffers };
