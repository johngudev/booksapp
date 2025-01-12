export async function fetchAllBooks() {
    const res = await fetch('https://novelglot.com/api/books');
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
}
