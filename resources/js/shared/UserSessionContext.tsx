import { createContext } from 'react';
import { User } from './types';

export default createContext<{
    userSession: User;
    setUserSession: (newUserSession: User) => void;
}>({
    userSession: null,
    setUserSession: (newUserSession) => {},
});
