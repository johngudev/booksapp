import { likeBook, unLikeBook } from '../api';

const BookCard = ({
    author,
    id,
    imageUrl,
    title,
}: {
    author: string;
    id: number;
    imageUrl: string;
    title: string;
}) => {
    return (
        <div className="flex flex-col md:w-1/6 bg-white rounded-lg shadow-lg overflow-hidden">
            <img
                src={imageUrl}
                alt="Book cover"
                className="w-full h-64 md:h-32 object-cover"
            />
            <div className="flex-1 flex flex-col justify justify-between p-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        {title}
                    </h2>
                    <p className="text-gray-600 mt-2">{author}</p>
                </div>
                <div className="flex flex-row gap-4 h-10">
                    <button
                        onClick={() => {
                            likeBook(id)
                                .then(() => console.log('success'))
                                .catch((err) => console.log(err));
                        }}
                    >
                        like
                    </button>
                    <button
                        onClick={() => {
                            unLikeBook(id)
                                .then(() => console.log('success'))
                                .catch((err) => console.log(err));
                        }}
                    >
                        unlike
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
