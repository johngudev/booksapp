import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AllBooksPage from './books/components/AllBooksPage';
import AllMeetingsPage from './meetings/components/AllMeetingsPage';
import UserBookLikesContext from './books/UserBookLikesContext';
import BooksContext from './books/BooksContext';
import MeetingsContext from './meetings/MeetingsContext';
import UserSessionContext from './shared/UserSessionContext';

const BooksApp = () => {
    const [userBookLikes, setUserBookLikes] = useState(null);
    const [books, setBooks] = useState(null);
    const [userSession, setUserSession] = useState(null);

    return (
        <UserSessionContext.Provider value={{ userSession, setUserSession }}>
            <BooksContext.Provider value={{ books, setBooks }}>
                <UserBookLikesContext.Provider
                    value={{ userBookLikes, setUserBookLikes }}
                >
                    <AllBooksPage />
                </UserBookLikesContext.Provider>
            </BooksContext.Provider>
        </UserSessionContext.Provider>
    );
};

const MeetingsApp = () => {
    const [books, setBooks] = useState(null);
    const [meetings, setMeetings] = useState(null);
    const [userSession, setUserSession] = useState(null);

    return (
        <UserSessionContext.Provider value={{ userSession, setUserSession }}>
            <BooksContext.Provider value={{ books, setBooks }}>
                <MeetingsContext.Provider value={{ meetings, setMeetings }}>
                    <AllMeetingsPage />
                </MeetingsContext.Provider>
            </BooksContext.Provider>
        </UserSessionContext.Provider>
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
