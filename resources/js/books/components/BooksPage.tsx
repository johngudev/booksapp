import { useContext, useEffect, useState } from 'react';
import { UserLikesContext } from '../context/UserLikesContext';
import { BooksContext } from '../context/BooksContext';
import { fetchAllBooks, fetchAllUserLikes } from '../api';
import BookCard from './BookCard';
import SearchBar from '../../shared/components/SearchBar';
import AddBookModal from './AddBookModal';

const BooksPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(null);
    const [showAddBookModal, setShowAddBookModal] = useState(false);

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
            })
            .catch(() => {
                console.log('error'); // TODO: error handling
            });
    }, []);

    useEffect(() => {
        if (books) {
            setFilteredBooks(Object.values(books));
        }
    }, [books]);

    const filterBooks = () => {
        console.log('filtering books');
        const newBooks = Object.values(books).filter(({ author, title }) =>
            `${author.toLowerCase()} ${title.toLowerCase()}`.includes(
                searchValue.toLowerCase()
            )
        );
        setFilteredBooks(newBooks);
    };

    return books && userLikes ? (
        <>
            <div className="mt-12 mx-auto px-6 lg:px-8">
                <div className="flex flex-row justify-center gap-4">
                    <SearchBar
                        onChange={({ target: { value } }) =>
                            setSearchValue(value)
                        }
                        onSearch={(evt) => {
                            evt.preventDefault();
                            filterBooks();
                        }}
                        placeholder="Search for a book"
                        value={searchValue}
                    />
                    <button
                        className="underline hover:no-underline transition ease-in-out delay-150 duration-300"
                        onClick={() => setShowAddBookModal(true)}
                    >
                        Add books
                    </button>
                </div>
                <div className="mt-12 flex md:flex-row flex-column flex-col gap-3 flex-wrap justify-center">
                    {filteredBooks.length ? (
                        filteredBooks.map((book) => {
                            const {
                                id,
                                image_url: imageUrl,
                                author,
                                title,
                            } = book;
                            return (
                                <BookCard
                                    author={author}
                                    id={id}
                                    imageUrl={imageUrl}
                                    key={`${id}:${title}:${author}`}
                                    title={title}
                                />
                            );
                        })
                    ) : (
                        <p>No results.</p>
                    )}
                </div>
            </div>
            {showAddBookModal && (
                <AddBookModal onClose={() => setShowAddBookModal(false)} />
            )}
        </>
    ) : (
        <>Loading...</> // TODO: loading spinner
    );
};

export default BooksPage;
