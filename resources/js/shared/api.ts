const appRoot = 'booksapp.test';
// const appRoot = 'localhost:8000';

export async function fetchUserSession() {
    const res = await fetch(`http://${appRoot}/api/session/user`);
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json;
}
