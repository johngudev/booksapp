import React from 'react';
import ReactDOM from 'react-dom/client';
import Book from '../views/components/Book';

const App = () => {
    return <Book/>;
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
    ReactDOM.createRoot(root).render(<App />);

    }

if (meetingsRoot) {
    ReactDOM.createRoot(meetingsRoot).render(<MeetingsApp />);
}

