import { useContext, useEffect, useState } from 'react';
import { likeBook, unLikeBook } from '../api';
import { UserLikesContext } from '../context/UserLikesContext';
import { BooksContext } from '../context/BooksContext';
import { HeartIcon } from '../../shared/components/Icons';

const CardActions = ({ bookId }) => {
    const { books } = useContext(BooksContext);
    const { userLikes, setUserLikes } = useContext(UserLikesContext);
    const liked = userLikes[bookId];

    return (
        <div className="flex flex-row justify-end px-2 pb-2">
            {liked ? (
                <button
                    onClick={() => {
                        unLikeBook(bookId)
                            .then(() => {
                                const newUserLikes: any = Object.values(
                                    userLikes
                                ).reduce((acc: any, likedBookData: any) => {
                                    if (likedBookData.id !== bookId) {
                                        return {
                                            ...acc,
                                            [likedBookData.id]: likedBookData,
                                        };
                                    }
                                    return acc;
                                }, {});
                                setUserLikes({
                                    ...newUserLikes,
                                });
                            })
                            .catch((err) => console.log(err));
                    }}
                >
                    <HeartIcon liked={liked} />
                </button>
            ) : (
                <button
                    className="invisible group-hover:visible"
                    onClick={() => {
                        likeBook(bookId)
                            .then(() => {
                                setUserLikes({
                                    ...userLikes,
                                    [bookId]: books[bookId],
                                });
                            })
                            .catch((err) => console.log(err));
                    }}
                >
                    <HeartIcon liked={liked} />
                </button>
            )}
        </div>
    );
};

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
        <div className="group relative flex flex-col md:w-1/6 bg-white rounded-lg shadow-lg overflow-hidden">
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
            <CardActions bookId={id} />
        </div>
    );
};

export default BookCard;
