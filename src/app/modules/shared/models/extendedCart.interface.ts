import { Cart, ProductCart } from "./cart.interface";

export interface ExtendedCart extends Cart{
    totalPriceCart: number
    products: ExtendedProductCart[];
}

export interface ExtendedProductCart extends ProductCart{
    title: string;
    price: number;
    category: string;
    totalPrice: number
    image: string
}