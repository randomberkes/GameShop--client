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

const getOrdersIDs = async (axiosPrivate) => {
	try {
		const response = await axiosPrivate.get("/order");
		const ordersIDs = response.data;
		return ordersIDs;
	} catch (err) {
		console.log(err);
	}
};

const getOrdersItems = async (orderID, axiosPrivate) => {
	try {
		const response = await axiosPrivate.get("/order/orderItem", {
			params: { orderID },
		});
		const orderItems = response.data;
		return orderItems;
	} catch (err) {
		console.log(err);
	}
};

export default { addOrderLink, getOrdersIDs, getOrdersItems };
