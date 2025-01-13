import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import BooksPage from './books/components/BooksPage';
import { UserLikesContext } from './books/context/UserLikesContext';
import { BooksContext } from './books/context/BooksContext';

const BooksApp = () => {
    const [userLikes, setUserLikes] = useState(null);
    const [books, setBooks] = useState(null);
    return (
        <BooksContext.Provider value={{ books, setBooks }}>
            <UserLikesContext.Provider value={{ userLikes, setUserLikes }}>
                <BooksPage />
            </UserLikesContext.Provider>
        </BooksContext.Provider>
    );
};

const MeetingsApp = () => {
    return <>this is meeting</>;
};
// If you want to render React in a specific element
// const root = document.getElementById('react-root');

const meetingsRoot = document.getElementById('meetings-root');
const root = document.getElementById('react-root');

if (root) {
    ReactDOM.createRoot(root).render(<BooksApp />);
}

if (meetingsRoot) {
    ReactDOM.createRoot(meetingsRoot).render(<MeetingsApp />);
}
