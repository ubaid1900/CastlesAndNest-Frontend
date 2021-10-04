export interface Book {
    id: number;
    title: string;
    description: string;
    price: number;
    type: string;
    authorId: number;
    author?: Author;
    isChecked: boolean;
    availableQuantity: number;
    images: BookImage[];
    exclude: boolean;
    reorderLevel: number;
}
export interface BookImage {
    id: number;
    bookId: number;
    imageUrl: string;
}
export interface Author {
    id: number;
    firstname: string;
    lastname: string;
}
export interface Grade {
    id: number;
    name: string;
}
export interface Subject {
    id: number;
    name: string;
}