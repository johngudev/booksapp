import { useContext, useState } from 'react';
import Button from '../../shared/components/Button';
// import { addMeeting } from '../api';
import MeetingsContext from '../MeetingsContext';
import { createMeeting } from '../api';

type AddMeetingModalProps = {
    onClose: () => void;
};

export default function AddMeetingModal({ onClose }: AddMeetingModalProps) {
    // prevent scrolling background content
    document.body.classList.add('overflow-hidden');
    const { meetings, setMeetings } = useContext(MeetingsContext);

    const [bookId, setBookId] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState('');
    const [time, setTime] = useState(null);
    const [zoomLink, setZoomLink] = useState('');

    const closeModal = () => {
        // allow scrolling background content again
        document.body.classList.remove('overflow-hidden');
        onClose();
    };

    const onSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        console.log({ bookId, date, description, time, zoomLink });
        // createMeeting({
        //     bookId,
        //     description,
        //     meetingAt: 'date' + 'time',
        //     zoomLink,
        // })
        //     .then((newMeeting) => {
        //         setMeetings({ ...meetings, [newMeeting.id]: newMeeting });
        //     })
        //     .finally(() => {
        //         closeModal();
        //     });
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
                        <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>
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
                            <input
                                type="text"
                                id="book"
                                name="book"
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={({ currentTarget: { value } }) =>
                                    setBookId(value)
                                }
                                value={bookId}
                                required
                            />
                        </div>
                        <div className="my-3">
                            <label
                                htmlFor="author"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={({ currentTarget: { value } }) =>
                                    setDescription(value)
                                }
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
                                name="date"
                                onChange={({ currentTarget: { value } }) =>
                                    setDate(value)
                                }
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
                                onChange={({ currentTarget: { value } }) =>
                                    setTime(value)
                                }
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
                                onChange={({ currentTarget: { value } }) =>
                                    setZoomLink(value)
                                }
                                required
                            />
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="h-12" id="footer">
                        <Button
                            disabled={!bookId || !description || !date || !time}
                            type="submit"
                            use="primary"
                        >
                            Create
                        </Button>
                        <Button use="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
