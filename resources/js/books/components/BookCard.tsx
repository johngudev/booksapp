import { useContext } from 'react';
import { likeBook, unLikeBook } from '../api';
import { HeartIcon } from '../../shared/components/Icons';
import UserBookLikesContext from '../UserBookLikesContext';
import BooksContext from '../BooksContext';

const CardActions = ({
    bookId,
    disabled,
}: {
    bookId: number;
    disabled: boolean;
}) => {
    const { books } = useContext(BooksContext);
    const { userBookLikes, setUserBookLikes } =
        useContext(UserBookLikesContext);

    return userBookLikes ? (
        <div className="flex flex-row justify-end px-2 pb-2">
            {userBookLikes[bookId] ? (
                <button
                    disabled={disabled}
                    onClick={() => {
                        unLikeBook(bookId)
                            .then(() => {
                                const newUserBookLikes: any = Object.values(
                                    userBookLikes
                                ).reduce((acc: any, likedBookData: any) => {
                                    if (likedBookData.id !== bookId) {
                                        return {
                                            ...acc,
                                            [likedBookData.id]: likedBookData,
                                        };
                                    }
                                    return acc;
                                }, {});
                                setUserBookLikes({
                                    ...newUserBookLikes,
                                });
                            })
                            .catch((err) => console.log(err));
                    }}
                >
                    <HeartIcon liked={true} />
                </button>
            ) : (
                <button
                    className="invisible group-hover:visible"
                    disabled={disabled}
                    onClick={() => {
                        likeBook(bookId)
                            .then(() => {
                                setUserBookLikes({
                                    ...userBookLikes,
                                    [bookId]: books[bookId],
                                });
                            })
                            .catch((err) => console.log(err));
                    }}
                >
                    <HeartIcon liked={false} />
                </button>
            )}
        </div>
    ) : (
        <></>
    );
};

const BookCard = ({
    author,
    disabled = false,
    id,
    imageUrl,
    onClick,
    selected,
    title,
}: {
    author: string;
    disabled?: boolean;
    id: number;
    imageUrl: string;
    onClick?: () => void;
    selected?: boolean;
    title: string;
}) => {
    const isSelectable = Boolean(onClick);
    return (
        <div
            className={`group relative flex flex-col bookcard-width bg-white rounded-lg shadow-lg overflow-hidden ${
                isSelectable &&
                'hover:cursor-pointer hover:ring-2 hover:ring-indigo-500'
            } ${selected && 'ring-2 ring-indigo-500'}`}
            onClick={onClick}
        >
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
            </div>
            <CardActions bookId={id} disabled={disabled} />
        </div>
    );
};

export default BookCard;
