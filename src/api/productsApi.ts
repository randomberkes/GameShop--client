import { Product } from "../DTO/product.ts";
import API from "./api.ts";

const mapDataToProduct = (data): Product => {
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
		const response = await API.get("/products");
		console.log(response);
		productListData = response.data.map((data) => {
			return mapDataToProduct(data);
		});
	} catch (e) {
		console.log(e);
	}

	return productListData;
};

export const getProductsByName = async (inputValue): Promise<Product[]> => {
	let productListData: Product[] = [];
	try {
		const response = await API.get("/products/search", {
			params: { name: inputValue },
		});
		console.log(response.data);
		productListData = response.data.map((data) => {
			return mapDataToProduct(data);
		});
	} catch (e) {
		console.log(e);
	}

	return productListData;
};

export const getProductsByFilter = async (inputValue): Promise<Product[]> => {
	let productListData: Product[] = [];
	try {
		const response = await API.get("/products/filter", {
			params: { filter: inputValue },
		});
		console.log(response.data);
		productListData = response.data.map((data) => {
			return mapDataToProduct(data);
		});
	} catch (e) {
		console.log(e);
	}

	return productListData;
};

export default {
	getAllProducts: getAllProducts,
	getProductsByName: getProductsByName,
	getProductsByFilter: getProductsByFilter,
};
