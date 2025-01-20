import { useContext, useState } from 'react';
import Button from '../../shared/components/Button';
import { addBook } from '../api';
import BooksContext from '../BooksContext';

type AddBookModalProps = {
    defaultTitle: string;
    onClose: () => void;
};

export default function AddBookModal({
    defaultTitle,
    onClose,
}: AddBookModalProps) {
    // prevent scrolling background content
    document.body.classList.add('overflow-hidden');
    const { books, setBooks } = useContext(BooksContext);

    const [title, setTitle] = useState(defaultTitle);
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const closeModal = () => {
        // allow scrolling background content again
        document.body.classList.remove('overflow-hidden');
        onClose();
    };

    const onSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        // const { title, author, imageUrl } = evt.currentTarget.elements;
        addBook({
            author,
            title,
            image_url: imageUrl ? imageUrl : null,
        })
            .then((newBook) => {
                setBooks({ ...books, [newBook.id]: newBook });
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
                    <h2 className="text-xl font-semibold">Add book</h2>
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
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={({ currentTarget: { value } }) =>
                                    setTitle(value)
                                }
                                placeholder="Enter the book title"
                                value={title}
                                required
                            />
                        </div>
                        <div className="my-3">
                            <label
                                htmlFor="author"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Author
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={({ currentTarget: { value } }) =>
                                    setAuthor(value)
                                }
                                placeholder="Enter the author's name"
                                value={author}
                                required
                            />
                        </div>
                        <div className="my-3">
                            <label
                                htmlFor="imageUrl"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Image URL (Optional)
                            </label>
                            <input
                                type="url"
                                id="image_url"
                                name="image_url"
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={({ currentTarget: { value } }) =>
                                    setImageUrl(value)
                                }
                                placeholder="Enter the image URL"
                                value={imageUrl}
                            />
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="h-12" id="footer">
                        <Button
                            disabled={!title || !author}
                            type="submit"
                            use="primary"
                        >
                            Add
                        </Button>
                        <Button
                            type="button"
                            use="secondary"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
