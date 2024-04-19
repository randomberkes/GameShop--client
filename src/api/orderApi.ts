const addOrderLink = async (price, orderItems, axiosPrivate) => {
	try {
		const response = await axiosPrivate.post("/order", {
			price,
			orderItems,
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export default { addOrderLink };
