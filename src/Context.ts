import { Dispatch, SetStateAction, createContext } from "react";
import { Product } from "./DTO/product";
import { CategoryType } from "./DTO/categoryType";

export type ProductsContextType = {
	products: Product[];
	setProducts: Dispatch<SetStateAction<Product[]>>;
};

export type CategoryTypeContextType = {
	categoryTypes: CategoryType[];
	setCategoryTypes: Dispatch<SetStateAction<CategoryType[]>>;
};

export type MyContextType = {
	productsContext: ProductsContextType;
	categoryTypesContext: CategoryTypeContextType;
};

export const MyContext = createContext<MyContextType>({
	productsContext: {
		products: [],
		setProducts: () => {
			return [];
		},
	},
	categoryTypesContext: {
		categoryTypes: [],
		setCategoryTypes: () => {
			return [];
		},
	},
});
