import { Dispatch, SetStateAction, createContext } from "react";
import { Product } from "./DTO/product";

export type ProductsContextType = {
	products: Product[];
	setProducts: Dispatch<SetStateAction<Product[]>>;
};

export const ProductsContext = createContext<ProductsContextType>({
	products: [],
	setProducts: () => {
		return [];
	},
});
