import { createContext } from 'react';

export const UserLikesContext = createContext({
    userLikes: null,
    setUserLikes: (newUserLikes: any) => {},
});
