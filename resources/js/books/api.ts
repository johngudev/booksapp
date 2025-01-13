import { useState } from 'react';

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

export async function fetchAllBooks() {
    const res = await fetch('https://novelglot.com/api/books');
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json.reduce((acc, bookData) => {
        return { ...acc, [bookData.id]: bookData };
    }, {});
}

export async function fetchAllUserLikes() {
    const res = await fetch('https://novelglot.com/api/session/books');
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json.reduce((acc, likeData) => {
        return { ...acc, [likeData.id]: likeData };
    }, {});
}

export async function likeBook(bookId: number) {
    const res = await fetch(
        `https://novelglot.com/api/session/books/${bookId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
        }
    );
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
}

export async function unLikeBook(bookId: number) {
    const res = await fetch(
        `https://novelglot.com/api/session/books/${bookId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
        }
    );
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
}
