export async function fetchAllBooks() {
    const res = await fetch('http://booksapp.test/api/books');
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
}
