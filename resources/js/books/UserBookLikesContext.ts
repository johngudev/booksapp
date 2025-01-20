import { createContext } from 'react';

export const UserBookLikesContext = createContext({
    userBookLikes: null,
    setUserBookLikes: (newUserBookLikes: any) => {},
});
