import { useContext, useEffect, useState } from 'react';
import { likeBook, unLikeBook } from '../api';
import { UserLikesContext } from '../context/UserLikesContext';
import { BooksContext } from '../context/BooksContext';

const HeartIcon = ({ liked }: { liked: boolean }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={liked ? 'red' : 'none'}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule={liked ? 'nonzero' : 'evenodd'}
            clipRule="evenodd"
            d="M12.0122 5.57169L10.9252 4.48469C8.77734 2.33681 5.29493 2.33681 3.14705 4.48469C0.999162 6.63258 0.999162 10.115 3.14705 12.2629L11.9859 21.1017L11.9877 21.0999L12.014 21.1262L20.8528 12.2874C23.0007 10.1395 23.0007 6.65711 20.8528 4.50923C18.705 2.36134 15.2226 2.36134 13.0747 4.50923L12.0122 5.57169ZM11.9877 18.2715L16.9239 13.3352L18.3747 11.9342L18.3762 11.9356L19.4386 10.8732C20.8055 9.50635 20.8055 7.29028 19.4386 5.92344C18.0718 4.55661 15.8557 4.55661 14.4889 5.92344L12.0133 8.39904L12.006 8.3918L12.005 8.39287L9.51101 5.89891C8.14417 4.53207 5.92809 4.53207 4.56126 5.89891C3.19442 7.26574 3.19442 9.48182 4.56126 10.8487L7.10068 13.3881L7.10248 13.3863L11.9877 18.2715Z"
            fill={liked ? 'red' : 'currentColor'}
        />
    </svg>
);

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
    const { books } = useContext(BooksContext);
    const { userLikes, setUserLikes } = useContext(UserLikesContext);

    const liked = userLikes[id];

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
                <div className="flex flex-row justify-end mt-4">
                    {liked ? (
                        <button
                            onClick={() => {
                                unLikeBook(id)
                                    .then(() => {
                                        const newUserLikes: any = Object.values(
                                            userLikes
                                        ).reduce(
                                            (acc: any, likedBookData: any) => {
                                                if (likedBookData.id !== id) {
                                                    return {
                                                        ...acc,
                                                        [likedBookData.id]:
                                                            likedBookData,
                                                    };
                                                }
                                                return acc;
                                            },
                                            {}
                                        );
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
                            onClick={() => {
                                likeBook(id)
                                    .then(() => {
                                        setUserLikes({
                                            ...userLikes,
                                            [id]: books[id],
                                        });
                                    })
                                    .catch((err) => console.log(err));
                            }}
                        >
                            <HeartIcon liked={liked} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookCard;
