export interface Category {
    id: number;
    name: string;
}
export interface SubCategory {
    id: number;
    categoryId: number;
    category: Category;
    name: string;
}
