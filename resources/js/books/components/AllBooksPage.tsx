import { debounce } from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';
import { UserBookLikesContext } from '../UserBookLikesContext';
import { BooksContext } from '../BooksContext';
import { fetchAllBooks, fetchAllUserBookLikes } from '../api';
import SearchBar from '../../shared/components/SearchBar';
import FilterBar from '../../shared/components/FilterBar';
import Button from '../../shared/components/Button';
import AddBookModal from './AddBookModal';
import BookCard from './BookCard';

const AllBooksPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [addBookTitle, setAddBookTitle] = useState('');

    const { userBookLikes, setUserBookLikes } =
        useContext(UserBookLikesContext);
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

        fetchAllUserBookLikes()
            .then((res) => {
                setUserBookLikes(res);
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
            <div id="header" className="flex flex-row justify-between">
                <h1 className="text-3xl text-midnight font-bold mb-5">Books</h1>
                <Button
                    // className="underline hover:no-underline transition ease-in-out delay-150 duration-300"
                    use="secondary"
                    onClick={() => setShowAddBookModal(true)}
                >
                    Add book
                </Button>
            </div>
            <FilterBar
                start={
                    <SearchBar
                        onChange={debouncedSearch}
                        placeholder="Search for a book"
                    />
                }
            />
            {books && userBookLikes ? (
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
                            <div className="flex-col text-center">
                                <p>No results.</p>
                                <button
                                    className="underline hover:no-underline transition ease-in-out delay-150 duration-300 text-green"
                                    onClick={() => {
                                        setShowAddBookModal(true);
                                        setAddBookTitle(searchValue);
                                    }}
                                >
                                    Add “{searchValue}” book
                                </button>
                            </div>
                        )}
                    </div>
                    {showAddBookModal && (
                        <AddBookModal
                            defaultTitle={addBookTitle}
                            onClose={() => {
                                setShowAddBookModal(false);
                                setAddBookTitle('');
                            }}
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
