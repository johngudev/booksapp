import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AllBooksPage from './books/components/AllBooksPage';
import AllMeetingsPage from './meetings/components/AllMeetingsPage';
import { UserLikesContext } from './books/context/UserLikesContext';
import { BooksContext } from './books/context/BooksContext';
import { MeetingsContext } from './meetings/context/MeetingsContext';

const BooksApp = () => {
    const [userLikes, setUserLikes] = useState(null);
    const [books, setBooks] = useState(null);
    return (
        <BooksContext.Provider value={{ books, setBooks }}>
            <UserLikesContext.Provider value={{ userLikes, setUserLikes }}>
                <AllBooksPage />
            </UserLikesContext.Provider>
        </BooksContext.Provider>
    );
};

const MeetingsApp = () => {
    const [meetings, setMeetings] = useState(null);
    return (
        <MeetingsContext.Provider value={{ meetings, setMeetings }}>
            <AllMeetingsPage />
        </MeetingsContext.Provider>
    );
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
