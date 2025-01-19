import { createContext } from 'react';

export const MeetingsContext = createContext({
    meetings: null,
    setMeetings: (newMeeting: any) => {},
});
