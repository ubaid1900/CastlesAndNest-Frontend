export interface Category {
    id: number;
    name: string;
    imageUrl: string;
}
export interface SubCategory {
    id: number;
    categoryId: number;
    category: Category;
    name: string;
    imageUrl: string;
}
