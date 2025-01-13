import { createContext } from 'react';

export const BooksContext = createContext({
    books: null,
    setBooks: (newBooks: any) => {},
});
