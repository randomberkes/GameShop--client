const getOwnerLinks = async (axiosPrivate) => {
	try {
		const response = await axiosPrivate.get("/activationKey/OwnerLinnk", {});
		const ownerLinks = response.data;
		return ownerLinks;
	} catch (err) {
		console.log(err);
	}
};

const getActivationKeys = async (ownerID: number, axiosPrivate) => {
	try {
		const response = await axiosPrivate.get("/activationKey", {
			params: { ownerID },
		});
		const activationKeys = response.data;
		console.log(activationKeys);
		return activationKeys;
	} catch (err) {
		console.log(err);
	}
};

const getActivationKeysByUser = async (offerID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.get("/activationKey/byUser", {
			params: { offerID },
		});
		const activationKeys = response.data;

		return activationKeys;
	} catch (err) {
		console.log(err);
	}
};

const addActivationKeyToOffer = async (
	productID,
	activationKeyID,
	axiosPrivate
) => {
	try {
		console.log(productID);
		const response = await axiosPrivate.post("/activationKey/addToOffer", {
			productID,
			activationKeyID,
		});
		const activationKeys = response.data;
		return activationKeys;
	} catch (err) {
		console.log(err);
	}
};

const addActivationKeyToOwner = async (
	productID,
	activationKeyID,
	axiosPrivate
) => {
	try {
		console.log(productID);
		const response = await axiosPrivate.post("/activationKey/addToOwner", {
			productID,
			activationKeyID,
		});
		const activationKeys = response.data;
		return activationKeys;
	} catch (err) {
		console.log(err);
	}
};

export default {
	getOwnerLinks,
	getActivationKeys,
	getActivationKeysByUser,
	addActivationKeyToOffer,
	addActivationKeyToOwner,
};