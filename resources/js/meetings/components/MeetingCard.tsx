import Button from '../../shared/components/Button';
import { Book, User } from '../../shared/types';
import { joinMeeting, leaveMeeting } from '../api';

type MeetingCardProps = {
    attendees: User[];
    book: Book;
    description: string;
    host: User;
    meetingAt: string;
    meetingId: number;
    zoomLink: string;
};

export default function MeetingCard({
    attendees,
    book,
    description,
    host,
    meetingAt,
    meetingId,
    zoomLink,
}: MeetingCardProps) {
    const meetingDate = new Date(meetingAt);
    const allAttendees = [...attendees, host];

    const { image_url: imageUrl, title } = book;

    const onJoin = () => {
        joinMeeting(meetingId)
            .then((res) => {
                console.log('Successfully joined!', res);
            })
            .catch((err) => console.log(err));
    };

    const onLeave = () => {
        leaveMeeting(meetingId)
            .then((res) => {
                console.log('Successfully left!', res);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden md:w-2/3 p-6 flex flex-row gap-2">
            <img
                id="meetingImage"
                alt="Book cover"
                className="w-64 h-32 object-cover"
                src={imageUrl}
            />
            <div id="meetingContent" className="">
                <div className="text-coffee-light font-semibold">
                    {meetingDate.toLocaleString()}
                </div>
                <div className="font-bold">Discussion: {title}</div>
                <div>{description}</div>
                <div className="">Hosted by: {host.name}</div>
            </div>
            <div className="absolute bottom-6 right-6">
                <Button onClick={onJoin} use="secondary">
                    Join
                </Button>
            </div>
        </div>
    );
}
