import { Category, SubCategory } from "./category";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    availableQuantity: number;
    exclude: boolean;
    reorderLevel: number;
    color: string;
    length: number;
    lengthUnit: string;
    width: number;
    widthUnit: string;
    height: number;
    heightUnit: string;
    weight: number;
    weightUnit: string;
    amazonLink: string;
    flipkartLink: string;
    images: ProductImage[];
    categoryId: number;
    category: Category;
    subcategoryId: number;
    subcategory: SubCategory;
}
export interface ProductImage {
    id: number;
    productId: number;
    imageUrl: string;
}

export interface Unit {
    name: string;
    displayName: string;
    type: string;
}