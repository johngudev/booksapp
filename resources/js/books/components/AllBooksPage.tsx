import { debounce } from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';
import { UserLikesContext } from '../context/UserLikesContext';
import { BooksContext } from '../context/BooksContext';
import { fetchAllBooks, fetchAllUserLikes } from '../api';
import BookCard from './BookCard';
import SearchBar from '../../shared/components/SearchBar';
import AddBookModal from './AddBookModal';

const AllBooksPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [showAddBookModal, setShowAddBookModal] = useState(false);

    const { userLikes, setUserLikes } = useContext(UserLikesContext);
    const { books, setBooks } = useContext(BooksContext);

    let filteredBooks = books ? Object.values(books) : [];

    useEffect(() => {
        fetchAllBooks()
            .then((res) => {
                setBooks(res);
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

    const handleSearch = ({ target: { value } }) => setSearchValue(value);

    const debouncedSearch = useMemo(() => {
        return debounce(handleSearch, 300);
    }, []);

    useEffect(() => debouncedSearch.cancel());

    if (searchValue !== '') {
        filteredBooks = Object.values(books).filter(({ author, title }) =>
            `${author.toLowerCase()} ${title.toLowerCase()}`.includes(
                searchValue.toLowerCase()
            )
        );
    }

    return (
        <div className="mt-12 max-w-screen-xl mx-auto px-6 lg:px-8">
            <h1 className="text-3xl text-midnight font-bold mb-5">Books</h1>
            <div id="filterBar" className="flex flex-row justify-start gap-4">
                <SearchBar
                    onChange={debouncedSearch}
                    placeholder="Search for a book"
                />
                <button
                    className="underline hover:no-underline transition ease-in-out delay-150 duration-300"
                    onClick={() => setShowAddBookModal(true)}
                >
                    Add books
                </button>
            </div>
            {books && userLikes ? (
                <>
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
                    {showAddBookModal && (
                        <AddBookModal
                            onClose={() => setShowAddBookModal(false)}
                        />
                    )}
                </>
            ) : (
                <>Loading...</> // TODO: loading spinner
            )}
        </div>
    );
};

export default AllBooksPage;
