import { createContext } from 'react';

export default createContext({
    userBookLikes: null,
    setUserBookLikes: (newUserBookLikes: any) => {},
});
