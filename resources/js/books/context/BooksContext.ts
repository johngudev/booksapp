import { createContext } from 'react';
import { BooksMap } from '../../shared/types';

export const BooksContext = createContext<{
    books: BooksMap;
    setBooks: (newBooks: BooksMap) => void;
}>({
    books: null,
    setBooks: (newBooks) => {},
});
