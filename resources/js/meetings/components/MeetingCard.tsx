import { useContext } from 'react';
import Button from '../../shared/components/Button';
import UserSessionContext from '../../shared/UserSessionContext';
import { pluralize } from '../../shared/utils';
import { MeetingsContext } from '../context/MeetingsContext';
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
    const { userSession } = useContext(UserSessionContext);
    const { meetings, setMeetings } = useContext(MeetingsContext);
    const meetingDate = new Date(meetingAt);
    const allAttendees = [...attendees, host];

    const isAttending =
        allAttendees.findIndex((user) => user.id === userSession?.id) !== -1;

    const isHost = host.id === userSession?.id;

    const { image_url: imageUrl, title } = book;

    const onJoin = () => {
        joinMeeting(meetingId)
            .then((res) => {
                console.log('Successfully joined!', res);
                setMeetings({
                    ...meetings,
                    [meetingId]: {
                        ...meetings[meetingId],
                        attendees: [...attendees, userSession],
                    },
                });
            })
            .catch((err) => console.log(err));
    };

    const onLeave = () => {
        leaveMeeting(meetingId)
            .then((res) => {
                console.log('Successfully left!', res);
                setMeetings({
                    ...meetings,
                    [meetingId]: {
                        ...meetings[meetingId],
                        attendees: attendees.filter(
                            (user) => user.id !== userSession.id
                        ),
                    },
                });
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
                <div>{pluralize(allAttendees.length, 'attendee')}</div>
            </div>
            <div className="absolute bottom-6 right-6">
                {isAttending ? (
                    <Button disabled={isHost} onClick={onLeave} use="secondary">
                        Leave
                    </Button>
                ) : (
                    <Button onClick={onJoin} use="secondary">
                        Join
                    </Button>
                )}
            </div>
        </div>
    );
}
