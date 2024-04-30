import { Product } from "../DTO/product.ts";
import API from "./api.ts";

export const mapDataToProduct = (data): Product => {
	return {
		id: data.id,
		name: data.name,
		platform: data.platform,
		gameDeviceCompatibility: data.game_device_compatibility,
		gameType: data.game_type,
		ratingPegi: data.rating_pegi,
		numberOfPlayers: data.number_of_players,
		descriptions: data.description,
		price: data.price,
		imgPath: data.img_path,
	};
};

export const getAllProducts = async (): Promise<Product[]> => {
	let productListData: Product[] = [];
	try {
		const response = await API.axiosPublic.get("/products");
		productListData = response.data.map((data) => {
			return mapDataToProduct(data);
		});
	} catch (err) {
		console.log(err);
	}

	return productListData;
};

export const getProductsByName = async (inputValue): Promise<Product[]> => {
	let productListData: Product[] = [];

	try {
		const response = await API.axiosPublic.get("/products/search", {
			params: { name: inputValue },
		});

		productListData = response.data.map((data) => {
			return mapDataToProduct(data);
		});
	} catch (err) {
		console.log(err);
	}

	return productListData;
};

export const getProductsByFilter = async (inputValue, page, limit) => {
	let productListData: Product[] = [];
	let totalPageNumber;
	try {
		const response = await API.axiosPublic.get("/products/filter", {
			params: { filter: inputValue, page: page, limit: limit },
		});
		totalPageNumber = response.data.totalPageNumber;
		productListData = response.data.products.map((data) => {
			return mapDataToProduct(data);
		});
	} catch (err) {
		console.log(err);
	}

	return { totalPageNumber, productListData };
};

const getProductByID = async (productID: any): Promise<Product> => {
	try {
		const response = await API.axiosPublic.get("/products", {
			params: { productID: productID },
		});
		const product = mapDataToProduct(response.data);
		return product;
	} catch (err) {
		console.log(err);
		return {
			id: 0,
			name: "",
			platform: "",
			gameDeviceCompatibility: "",
			gameType: "",
			ratingPegi: "",
			numberOfPlayers: "",
			descriptions: "",
			price: 0,
			imgPath: "",
		};
	}
};

export default {
	getAllProducts,
	getProductsByName,
	getProductsByFilter,
	getProductByID,
};
