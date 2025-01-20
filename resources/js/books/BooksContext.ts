import { createContext } from 'react';
import { BooksMap } from '../shared/types';

export default createContext<{
    books: BooksMap;
    setBooks: (newBooks: BooksMap) => void;
}>({
    books: null,
    setBooks: (newBooks) => {},
});
