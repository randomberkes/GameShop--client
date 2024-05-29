const getOwnerLinks = async (axiosPrivate) => {
	try {
		const response = await axiosPrivate.get('/activationKey/OwnerLinnk', {});
		const ownerLinks = response.data;
		return ownerLinks;
	} catch (err) {
		console.log(err);
	}
};

const getActivationKeys = async (ownerID: number, axiosPrivate) => {
	try {
		const response = await axiosPrivate.get('/activationKey/byOwner', {
			params: { ownerID },
		});
		const activationKeys = response.data;
		return activationKeys;
	} catch (err) {
		console.log(err);
	}
};

const getActivationKeysByUser = async (offerID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.get('/activationKey/byOffer', {
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
		const response = await axiosPrivate.post('/activationKey/addToOffer', {
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
		const response = await axiosPrivate.post('/activationKey/addToOwner', {
			productID,
			activationKeyID,
		});
		const activationKeys = response.data;
		return activationKeys;
	} catch (err) {
		console.log(err);
	}
};

const addNewActivationKeyToOffer = async (
	productID,
	activationKey,
	axiosPrivate
) => {
	try {
		const response = await axiosPrivate.post('/activationKey/addNewToOffer', {
			productID,
			activationKey,
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
	addNewActivationKeyToOffer,
};
