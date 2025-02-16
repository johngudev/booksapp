import { useContext, useEffect, useState } from 'react';
import Button from '../../shared/components/Button';
import LoadingWrapper from '../../shared/components/LoadingWrapper';
import ErrorMessage from '../../shared/components/ErrorMessage';
import BooksContext from '../../books/BooksContext';
import { fetchAllBooks } from '../../books/api';
import MeetingsContext from '../MeetingsContext';
import { createMeeting } from '../api';
import { ExitIcon } from '../../shared/components/Icons';

type AddMeetingModalProps = {
    onClose: () => void;
};

export default function AddMeetingModal({ onClose }: AddMeetingModalProps) {
    // prevent scrolling background content
    document.body.classList.add('overflow-hidden');
    const { meetings, setMeetings } = useContext(MeetingsContext);
    const { books, setBooks } = useContext(BooksContext);

    const [loading, setLoading] = useState(false);
    const [bookId, setBookId] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState('');
    const [time, setTime] = useState(null);
    const [zoomLink, setZoomLink] = useState('');

    const today = new Date().toISOString().split('T')[0];

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
                .catch((err) => {
                    console.log('error'); // TODO: error handling
                    setLoading(false);
                });
        }
    }, [books]);

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
            <div className="fixed w-full h-full top-0 left-0 opacity-75 bg-slate-900 z-1" />
            {/* Modal */}
            <div className="absolute top-1/4 max-w-md bg-white z-10 mx-auto left-0 right-0 rounded-lg shadow-lg p-6">
                {/* Modal title */}
                <div className="h-10 mb-4" id="title">
                    <h2 className="text-xl font-semibold">Create a meeting</h2>
                    <button
                        className="absolute top-0 right-0 h-12 p-6"
                        onClick={closeModal}
                    >
                        <ExitIcon />
                    </button>
                </div>
                <LoadingWrapper loading={loading}>
                    {books ? (
                        <form className="space-y-6" onSubmit={onSubmit}>
                            {/* Modal content */}
                            <div id="body" className="mb-4">
                                <div className="my-3">
                                    <label
                                        htmlFor="book"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Book
                                    </label>
                                    <select
                                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        defaultValue=""
                                        id="book"
                                        name="book"
                                        onChange={({
                                            currentTarget: { value },
                                        }) => {
                                            setBookId(value);
                                        }}
                                    >
                                        <option value="" disabled hidden>
                                            Select a book
                                        </option>
                                        {Object.values(books).map((book) => (
                                            <option
                                                key={book.id}
                                                value={book.id}
                                            >
                                                {book.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="my-3">
                                    <label
                                        htmlFor="author"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="author"
                                        name="author"
                                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={({
                                            currentTarget: { value },
                                        }) => setDescription(value)}
                                        placeholder="Enter description"
                                        value={description}
                                        required
                                    />
                                </div>
                                <div className="my-3">
                                    <label
                                        htmlFor="date"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Date
                                    </label>
                                    <input
                                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        id="date"
                                        type="date"
                                        min={today}
                                        name="date"
                                        onChange={({
                                            currentTarget: { value },
                                        }) => setDate(value)}
                                        required
                                    />
                                </div>
                                <div className="my-3">
                                    <label
                                        htmlFor="time"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Time
                                    </label>
                                    <input
                                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        id="time"
                                        type="time"
                                        name="time"
                                        onChange={({
                                            currentTarget: { value },
                                        }) => setTime(value)}
                                        required
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
                                        onChange={({
                                            currentTarget: { value },
                                        }) => setZoomLink(value)}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Footer */}
                            <div className="h-12" id="footer">
                                <Button
                                    disabled={
                                        !bookId ||
                                        !description ||
                                        !date ||
                                        !time ||
                                        !zoomLink
                                    }
                                    type="submit"
                                    use="primary"
                                >
                                    Create
                                </Button>
                                <Button
                                    onClick={closeModal}
                                    type="button"
                                    use="secondary"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <ErrorMessage />
                    )}
                </LoadingWrapper>
            </div>
        </>
    );
}
