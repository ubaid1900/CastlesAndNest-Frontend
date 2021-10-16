export interface Category {
    id: number;
    name: string;
    imageUrl: string;
    subCategories: SubCategory[];
}
export interface SubCategory {
    id: number;
    categoryId: number;
    category: Category;
    name: string;
    imageUrl: string;
}
