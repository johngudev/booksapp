import { useContext } from 'react';
import Button from '../../shared/components/Button';
import { addBook } from '../api';
import { BooksContext } from '../context/BooksContext';

interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    author: HTMLInputElement;
    imageUrl: HTMLInputElement;
}
interface AddBookFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function AddBookModal({ onClose }) {
    const { books, setBooks } = useContext(BooksContext);

    const onSubmit = (evt: React.FormEvent<AddBookFormElement>) => {
        evt.preventDefault();
        const { title, author, imageUrl } = evt.currentTarget.elements;
        addBook({
            author: author.value,
            title: title.value,
            image_url: imageUrl ? imageUrl.value : null,
        })
            .then((newBook) => {
                setBooks({ ...books, [newBook.id]: newBook });
            })
            .finally(() => {
                onClose();
            });
    };
    return (
        <>
            <div className="w-full h-full opacity-75  bg-slate-900 absolute top-0 left-0 z-0"></div>
            <div className="absolute max-w-md bg-white z-10 ml-auto mr-auto left-0 right-0 rounded-lg shadow-lg p-6">
                <div className="h-10 mb-4" id="title">
                    <h2 className="text-xl font-semibold">Add book</h2>
                    <button
                        className="absolute top-0 right-0 h-12 px-4"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div id="body" className="mb-4">
                        <div>
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter the book title"
                                required
                            />
                        </div>
                        <div>
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter the author's name"
                                required
                            />
                        </div>
                        <div>
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter the image URL"
                            />
                        </div>
                    </div>
                    <div className="h-12" id="footer">
                        <Button type="submit" use="primary">
                            Add
                        </Button>
                        <Button use="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
