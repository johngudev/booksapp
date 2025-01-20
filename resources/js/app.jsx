import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AllBooksPage from './books/components/AllBooksPage';
import AllMeetingsPage from './meetings/components/AllMeetingsPage';
import { UserLikesContext } from './books/context/UserLikesContext';
import { BooksContext } from './books/context/BooksContext';
import { MeetingsContext } from './meetings/context/MeetingsContext';
import UserSessionContext from './shared/UserSessionContext';

const BooksApp = () => {
    const [userLikes, setUserLikes] = useState(null);
    const [books, setBooks] = useState(null);
    const [userSession, setUserSession] = useState(null);

    return (
        <UserSessionContext.Provider value={{ userSession, setUserSession }}>
            <BooksContext.Provider value={{ books, setBooks }}>
                <UserLikesContext.Provider value={{ userLikes, setUserLikes }}>
                    <AllBooksPage />
                </UserLikesContext.Provider>
            </BooksContext.Provider>
        </UserSessionContext.Provider>
    );
};

const MeetingsApp = () => {
    const [meetings, setMeetings] = useState(null);
    const [userSession, setUserSession] = useState(null);

    return (
        <UserSessionContext.Provider value={{ userSession, setUserSession }}>
            <MeetingsContext.Provider value={{ meetings, setMeetings }}>
                <AllMeetingsPage />
            </MeetingsContext.Provider>
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
