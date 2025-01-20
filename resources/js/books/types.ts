export type Book = {
    author: string;
    created_at: string;
    id: number;
    image_url: string;
    title: string;
    updated_at: string;
};

export type BookMap = {
    [bookId: number]: Book;
};
