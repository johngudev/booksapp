import React from 'react';
import ReactDOM from 'react-dom/client';
import BooksPage from './books/components/BooksPage';

const BooksApp = () => {
    return <BooksPage />;
};

const MeetingsApp = () => {
    return <>this is meeting</>;
};
// If you want to render React in a specific element
// const root = document.getElementById('react-root');

const meetingsRoot = document.getElementById('meetings-root');
const root = document.getElementById('react-root');

if (root) {
    // console.log(React)
    ReactDOM.createRoot(root).render(<BooksApp />);
}

if (meetingsRoot) {
    ReactDOM.createRoot(meetingsRoot).render(<MeetingsApp />);
}
