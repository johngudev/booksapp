export interface Meeting {
    book_id: number;
    created_at: string;
    date_time: string;
    description: string;
    id: number;
    updated_at: string;
    user_id: number;
    zoom_link: string;
}

export interface MeetingsMap {
    [meetingId: number]: Meeting;
}
