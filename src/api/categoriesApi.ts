import { Category } from "../DTO/category.ts";
import API from "./api.ts";

export const getCategoriesByType = async (
	categoryType
): Promise<Category[]> => {
	let categoryListData: Category[] = [];
	try {
		const response = await API.axiosPublic.get("/categories", {
			params: { categoryType: categoryType },
		});
		categoryListData = response.data.map((data) => {
			return {
				id: data.id,
				name: data.category_name,
			};
		});
	} catch (e) {
		console.log(e);
	}

	return categoryListData;
};

export default { getCategoriesByType: getCategoriesByType };
