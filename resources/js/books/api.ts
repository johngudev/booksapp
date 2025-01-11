const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

export async function fetchAllBooks() {
    const res = await fetch('http://booksapp.test/api/books');
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
}

export async function likeBook(bookId: number) {
    const res = await fetch(`http://booksapp.test/api/books/link/${bookId}`, {
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
    const res = await fetch(`http://booksapp.test/api/books/link/${bookId}`, {
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
