import { createContext } from 'react';
import { MeetingsMap } from '../../shared/types';

export const MeetingsContext = createContext<{
    meetings: MeetingsMap;
    setMeetings: (newMeeting: MeetingsMap) => void;
}>({
    meetings: null,
    setMeetings: (newMeeting) => {},
});
