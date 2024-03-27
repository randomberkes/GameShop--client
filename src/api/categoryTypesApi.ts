import { CategoryType } from "../DTO/categoryType.ts";
import API from "./api.ts";

export const getAllCategoryTypes = async (): Promise<CategoryType[]> => {
	let categoryTypeListData: CategoryType[] = [];
	try {
		const response = await API.get("/categoryTypes");
		categoryTypeListData = response.data.map((data) => {
			return {
				id: data.id,
				name: data.category_type_name,
			};
		});
	} catch (e) {
		console.log(e);
	}

	return categoryTypeListData;
};

export default { getAllCategoryTypes: getAllCategoryTypes };
