import { debounce } from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';
import UserBookLikesContext from '../UserBookLikesContext';
import BooksContext from '../BooksContext';
import { fetchAllBooks, fetchAllUserBookLikes } from '../api';
import SearchBar from '../../shared/components/SearchBar';
import FilterBar from '../../shared/components/FilterBar';
import Button from '../../shared/components/Button';
import LoadingWrapper from '../../shared/components/LoadingWrapper';
import ErrorMessage from '../../shared/components/ErrorMessage';
import AddBookModal from './AddBookModal';
import BookCard from './BookCard';

const AllBooksPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [addBookTitle, setAddBookTitle] = useState('');
    const [loading, setLoading] = useState(true);

    const { userBookLikes, setUserBookLikes } =
        useContext(UserBookLikesContext);
    const { books, setBooks } = useContext(BooksContext);

    let filteredBooks = books ? Object.values(books) : [];

    useEffect(() => {
        if (!books) {
            setLoading(true);
            fetchAllBooks()
                .then((res) => {
                    setLoading(false);
                    const booksMap = res.reduce((acc, bookData) => {
                        return { ...acc, [bookData.id]: bookData };
                    }, {});
                    setBooks(booksMap);
                })
                .catch(() => {
                    setLoading(false);
                    console.log('error'); // TODO: error handling
                });
        } else {
            setLoading(false);
        }

        if (!userBookLikes) {
            fetchAllUserBookLikes()
                .then((res) => {
                    const userBookLikesMap = res.reduce((acc, likeData) => {
                        return { ...acc, [likeData.id]: likeData };
                    }, {});
                    setUserBookLikes(userBookLikesMap);
                })
                .catch(() => {
                    console.log('error'); // TODO: error handling
                });
        }
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
            <div className="mt-12 flex md:flex-row flex-column flex-col gap-3 flex-wrap justify-center">
                <LoadingWrapper loading={loading}>
                    {books ? (
                        <>
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
                                            userBookLikes={userBookLikes}
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
                        </>
                    ) : (
                        <ErrorMessage />
                    )}
                </LoadingWrapper>
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
        </div>
    );
};

export default AllBooksPage;
