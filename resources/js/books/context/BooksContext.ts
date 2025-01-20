import { createContext } from 'react';
import { BookMap } from '../types';

export const BooksContext = createContext<{
    books: BookMap;
    setBooks: (newBooks: BookMap) => void;
}>({
    books: null,
    setBooks: (newBooks) => {},
});
