import { debounce } from 'lodash';
import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import Button from '../../shared/components/Button';
import { CheckMarkIcon, ExitIcon } from '../../shared/components/Icons';
import FilterBar from '../../shared/components/FilterBar';
import SearchBar from '../../shared/components/SearchBar';
import LoadingWrapper from '../../shared/components/LoadingWrapper';
import ErrorMessage from '../../shared/components/ErrorMessage';
import BookCard from '../../books/components/BookCard';
import BooksContext from '../../books/BooksContext';
import UserBookLikesContext from '../../books/UserBookLikesContext';
import { fetchAllBooks, fetchAllUserBookLikes } from '../../books/api';
import MeetingsContext from '../MeetingsContext';
import { getStepErrorValidation } from '../utils';
import { createMeeting } from '../api';

const steps = ['Select a book', 'Add details', 'Confirm'];

const ConfirmationStep = ({ bookId, date, description, time, zoomLink }) => {
    const { books } = useContext(BooksContext);
    const book = books[bookId];

    return (
        <>
            <div className="flex flex-row">
                <img className="w-1/4" src={book.image_url} alt={book.title} />
                <div className="w-3/4 mx-10" id="details">
                    <div className="font-bold">Book</div>
                    <p>{book ? `${book.title} by ${book.author}` : 'Error'}</p>
                    <div className="font-bold mt-3">Date</div>
                    <p>{date}</p>
                    <div className="font-bold mt-3">Time</div>
                    <p>{time}</p>
                    <div className="font-bold mt-3">Description</div>
                    <p>{description}</p>
                    <div className="font-bold mt-3">Zoom Link</div>
                    <p>{zoomLink}</p>
                </div>
            </div>
        </>
    );
};
const AddDetailsStep = ({
    date,
    description,
    time,
    zoomLink,
    setDate,
    setDescription,
    setTime,
    setZoomLink,
}) => {
    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            {/* Modal content */}
            <div className="w-1/2">
                <div className="my-3">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description*
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={({ currentTarget: { value } }) =>
                            setDescription(value)
                        }
                        placeholder="Enter description"
                        required
                        value={description}
                    />
                </div>
                <div className="my-3">
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Date*
                    </label>
                    <input
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="date"
                        type="date"
                        min={today}
                        name="date"
                        onChange={({ currentTarget: { value } }) =>
                            setDate(value)
                        }
                        required
                        value={date}
                    />
                </div>
                <div className="my-3">
                    <label
                        htmlFor="time"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Time*
                    </label>
                    <input
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="time"
                        type="time"
                        name="time"
                        onChange={({ currentTarget: { value } }) =>
                            setTime(value)
                        }
                        required
                        value={time}
                    />
                </div>
                <div className="my-3">
                    <label
                        htmlFor="zoomLink"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Zoom Link
                    </label>
                    <input
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="zoomLink"
                        type="url"
                        name="zoomLink"
                        onChange={({ currentTarget: { value } }) =>
                            setZoomLink(value)
                        }
                        required
                        value={zoomLink}
                    />
                </div>
            </div>
        </>
    );
};

const SelectBookStep = ({ bookId, setBookId }) => {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
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
        <>
            <div className="mb-4">
                <b>Selected book:</b>{' '}
                {bookId && books ? books[bookId].title : 'No book selected yet'}
            </div>
            <FilterBar
                start={
                    <SearchBar
                        onChange={debouncedSearch}
                        placeholder="Search for a book"
                    />
                }
            />
            <div className="mt-12 flex sm:flex-row flex-row gap-3 flex-wrap">
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
                                            disabled={true}
                                            id={id}
                                            imageUrl={imageUrl}
                                            key={`${id}:${title}:${author}`}
                                            onClick={() => setBookId(id)}
                                            selected={bookId === id}
                                            title={title}
                                        />
                                    );
                                })
                            ) : (
                                <div className="flex-col text-center">
                                    <p>No results.</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <ErrorMessage />
                    )}
                </LoadingWrapper>
            </div>
        </>
    );
};

export default function AddMeetingWizard({ onClose }) {
    // prevent scrolling background content
    document.body.classList.add('overflow-hidden');

    const { meetings, setMeetings } = useContext(MeetingsContext);
    const [currentStep, setCurrentStep] = useState(0);
    const [bookId, setBookId] = useState(undefined);
    const [date, setDate] = useState(undefined);
    const [description, setDescription] = useState('');
    const [time, setTime] = useState(undefined);
    const [zoomLink, setZoomLink] = useState('');

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const closeModal = () => {
        // allow scrolling background content again
        document.body.classList.remove('overflow-hidden');
        onClose();
    };

    const onSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        createMeeting({
            bookId,
            description,
            meetingAt: `${date} ${time}`,
            zoomLink,
        })
            .then((newMeeting) => {
                setMeetings({
                    ...meetings,
                    [newMeeting.id]: {
                        ...newMeeting,
                    },
                });
            })
            .finally(() => {
                closeModal();
            });
    };

    return (
        <>
            {/* Overlay */}
            <div className="fixed w-full h-full top-0 left-0 bg-gray-100 overflow-auto">
                <form className="pb-24" onSubmit={onSubmit}>
                    {/* Header */}
                    <div
                        className="h-10 mb-4 flex justify-between p-16 "
                        id="header"
                    >
                        <h2 className="text-l font-semibold">
                            Create a meeting
                        </h2>
                        {/* Step Tracker */}
                        <div className="flex items-center justify-center mb-6">
                            {steps.map((step, index) => (
                                <Fragment key={`step-${index}`}>
                                    <div className="flex flex-col items-center w-[150px]">
                                        <div
                                            className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-sm font-bold transition-all duration-300 ${
                                                index <= currentStep
                                                    ? 'bg-coffee-light'
                                                    : 'bg-gray-300'
                                            }`}
                                        >
                                            {currentStep > index ? (
                                                <CheckMarkIcon />
                                            ) : (
                                                index + 1
                                            )}
                                        </div>
                                        <span className="text-xs mt-2 text-gray-600">
                                            {step}
                                        </span>
                                    </div>
                                    {index !== steps.length - 1 && (
                                        <hr
                                            className={`border w-1/4 ${
                                                currentStep > index &&
                                                'border-coffee-light'
                                            }`}
                                        />
                                    )}
                                </Fragment>
                            ))}
                        </div>
                        <div />
                        <button
                            className="absolute top-0 right-0 h-12 p-6"
                            onClick={onClose}
                        >
                            <ExitIcon />
                        </button>
                    </div>
                    {/* Content */}
                    <div className="px-16">
                        {currentStep === 0 && (
                            <SelectBookStep
                                bookId={bookId}
                                setBookId={setBookId}
                            />
                        )}
                        {currentStep === 1 && (
                            <AddDetailsStep
                                date={date}
                                description={description}
                                time={time}
                                zoomLink={zoomLink}
                                setDate={setDate}
                                setDescription={setDescription}
                                setTime={setTime}
                                setZoomLink={setZoomLink}
                            />
                        )}
                        {currentStep === 2 && (
                            <ConfirmationStep
                                bookId={bookId}
                                date={date}
                                description={description}
                                time={time}
                                zoomLink={zoomLink}
                            />
                        )}
                    </div>
                    {/* Navigation Buttons */}
                    <div className="fixed bottom-0 w-full flex justify-between mt-6 py-6 px-16 bg-white border-t">
                        <Button
                            disabled={currentStep === 0}
                            onClick={prevStep}
                            use="secondary"
                        >
                            Previous
                        </Button>
                        {currentStep !== steps.length - 1 && (
                            <Button
                                disabled={
                                    getStepErrorValidation({
                                        currentStep,
                                        bookId,
                                        date,
                                        description,
                                        time,
                                    }).length > 0
                                }
                                onClick={nextStep}
                                use="primary"
                            >
                                Next
                            </Button>
                        )}
                        {currentStep === steps.length - 1 && (
                            <Button
                                disabled={
                                    getStepErrorValidation({
                                        currentStep,
                                        bookId,
                                        date,
                                        description,
                                        time,
                                    }).length > 0
                                }
                                type="submit"
                                use="primary"
                            >
                                Create
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
