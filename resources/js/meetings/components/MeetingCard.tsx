import { Book, User } from '../../shared/types';

type MeetingCardProps = {
    book: Book;
    description: string;
    host: User;
    meetingAt: string;
    meetingId: number;
    zoomLink: string;
};

export default function MeetingCard({
    book,
    description,
    host,
    meetingAt,
    meetingId,
    zoomLink,
}) {
    return <>Meeting {meetingId}</>;
}
