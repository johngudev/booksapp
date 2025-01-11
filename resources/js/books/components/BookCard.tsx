const BookCard = ({
    author,
    imageUrl,
    title,
}: {
    author: string;
    imageUrl: string;
    title: string;
}) => {
    return (
        <div className="md:w-1/6 bg-white rounded-lg shadow-lg overflow-hidden">
            <img
                src={imageUrl}
                alt="Book cover"
                className="w-full h-64 md:h-32 object-cover"
            />
            <div className="py-2 px-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2">{author}</p>
            </div>
        </div>
    );
};

export default BookCard;
