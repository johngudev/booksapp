import { Book } from '../shared/types';

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

const appRoot = 'booksapp.test';
// const appRoot = 'localhost:8000';

const apiBooksIndexUrl=document
    .getElementById('react-root')
    .getAttribute('data-api-books-index')

export async function fetchAllBooks(): Promise<Book[]> {
    const res = await fetch(apiBooksIndexUrl);
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
}

export async function fetchAllUserBookLikes() {
    const res = await fetch(`http://${appRoot}/api/session/books`);
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
}

export async function likeBook(bookId: number) {
    const res = await fetch(`http://${appRoot}/api/session/books/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
        },
    });
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
}

export async function unLikeBook(bookId: number) {
    const res = await fetch(`http://${appRoot}/api/session/books/${bookId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
        },
    });
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
}

export async function addBook({
    author,
    title,
    image_url,
}: {
    author: string;
    title: string;
    image_url?: string;
}) {
    const res = await fetch(`http://${appRoot}/api/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({
            author,
            title,
            image_url,
        }),
    });

    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
}
