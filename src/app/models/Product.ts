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
    lengthUnit: Unit;
    width: number;
    widthUnit: Unit;
    height: number;
    heightUnit: Unit;
    weight: number;
    weightUnit: Unit;
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
export enum Unit {
    Meter,
    Centimeter,
    Millimeter,
    Inch,
    Feet,
    Gram,
    Kilogram
}