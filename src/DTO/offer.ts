import { Product } from "./product";

export type Offer = {
	id: number;
	name: string;
	price: number;
	product: Product;
};
