import { Dispatch, SetStateAction, createContext } from "react";
import { Product } from "./DTO/product";
import { CategoryType } from "./DTO/categoryType";
import { Filter } from "./DTO/filter";

export type ProductsContextType = {
	products: Product[];
	setProducts: Dispatch<SetStateAction<Product[]>>;
};

export type CategoryTypeContextType = {
	categoryTypes: CategoryType[];
	setCategoryTypes: Dispatch<SetStateAction<CategoryType[]>>;
};

export type FilterContextType = {
	filter: Filter;
	setFilter: Dispatch<SetStateAction<Filter>>;
};

export type MyContextType = {
	productsContext: ProductsContextType;
	categoryTypesContext: CategoryTypeContextType;
	filterContext: FilterContextType;
};

export const CategoryTypeContext = createContext<CategoryTypeContextType>({
	categoryTypes: [],
	setCategoryTypes: () => {
		return [];
	},
});

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
	filterContext: {
		filter: {},
		setFilter: () => {
			return {};
		},
	},
});
