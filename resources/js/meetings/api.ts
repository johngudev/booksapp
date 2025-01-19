const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

// const appRoot = booksapp.test
const appRoot = 'localhost:8000';

export async function fetchAllMeetings() {
    const res = await fetch(`http://${appRoot}/api/meetings`);
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json.reduce((acc, meetingData) => {
        return { ...acc, [meetingData.id]: meetingData };
    }, {});
}
