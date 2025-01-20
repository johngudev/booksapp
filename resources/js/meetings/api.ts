const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

const appRoot = 'novelglot.com';
// const appRoot = 'localhost:8000';

export async function fetchAllMeetings() {
    const res = await fetch(`https://${appRoot}/api/meetings`);
    if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    return json.reduce((acc, meetingData) => {
        return { ...acc, [meetingData.id]: meetingData };
    }, {});
}

export async function joinMeeting(meetingId: number) {
    const res = await fetch(
        `https://${appRoot}/api/session/meetings/join/${meetingId}`,
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

export async function leaveMeeting(meetingId: number) {
    const res = await fetch(
        `https://${appRoot}/api/session/meetings/join/${meetingId}`,
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
