import { useContext, useEffect, useState } from 'react';
import { fetchAllBooks, fetchAllUserLikes } from '../api';
import BookCard from './BookCard';
import SearchBar from '../../shared/components/SearchBar';
import { UserLikesContext } from '../context/UserLikesContext';
import { BooksContext } from '../context/BooksContext';

const BooksPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(null);

    const { userLikes, setUserLikes } = useContext(UserLikesContext);
    const { books, setBooks } = useContext(BooksContext);

    useEffect(() => {
        fetchAllBooks()
            .then((res) => {
                setBooks(res);
                setFilteredBooks(Object.values(res));
            })
            .catch(() => {
                console.log('error'); // TODO: error handling
            });

        fetchAllUserLikes()
            .then((res) => {
                setUserLikes(res);
                console.log('user likes', res);
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
        setFilteredBooks(Object.values(newBooks));
    };

    return books && userLikes ? (
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
                            id={id}
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
