import { createContext } from 'react';
import { MeetingsMap } from '../shared/types';

export default createContext<{
    meetings: MeetingsMap;
    setMeetings: (newMeeting: MeetingsMap) => void;
}>({
    meetings: null,
    setMeetings: (newMeeting) => {},
});
