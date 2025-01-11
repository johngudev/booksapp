import { useEffect, useState } from 'react';
import { fetchAllBooks } from '../api';
import BookCard from './BookCard';
import SearchBar from '../../shared/components/SearchBar';

const BooksPage = () => {
    const [books, setBooks] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(books);

    useEffect(() => {
        fetchAllBooks()
            .then((res) => {
                setBooks(res);
                setFilteredBooks(res);
            })
            .catch(() => {
                console.log('error'); // TODO: error handling
            });
    }, []);

    const filterBooks = () => {
        const newBooks = books.filter(({ author, title }) =>
            `${author.toLowerCase()} ${title.toLowerCase()}`.includes(
                searchValue.toLowerCase()
            )
        );
        setFilteredBooks(newBooks);
    };

    return books ? (
        <>
            <SearchBar
                onChange={({ target: { value } }) => setSearchValue(value)}
                onSearch={(evt) => {
                    evt.preventDefault();
                    filterBooks();
                }}
                placeholder="Search for a book"
                value={searchValue}
            />
            <div className="py-12 max-w-6xl mx-auto px-6 lg:px-8 flex md:flex-row flex-column flex-col gap-3 flex-wrap justify-center">
                {filteredBooks.map((book) => {
                    const { id, image_url: imageUrl, author, title } = book;
                    return (
                        <BookCard
                            author={author}
                            imageUrl={imageUrl}
                            key={`${id}:${title}:${author}`}
                            title={title}
                        />
                    );
                })}
            </div>
        </>
    ) : (
        <>Loading...</> // TODO: loading spinner
    );
};

export default BooksPage;
