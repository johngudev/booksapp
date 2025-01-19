export default function MeetingCard({
    bookId,
    description,
    meetingAt,
    meetingId,
    userId,
    zoomLink,
}: {
    bookId: number;
    description: string;
    meetingAt: number;
    meetingId: number;
    userId: number;
    zoomLink: string;
}) {
    return <>Meeting {meetingId}</>;
}
