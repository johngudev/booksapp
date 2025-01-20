export type Book = {
    author: string;
    created_at: string;
    id: number;
    image_url: string;
    title: string;
    updated_at: string;
};

export type BooksMap = {
    [bookId: number]: Book;
};

export type Meeting = {
    attendees: User[];
    book: Book;
    book_id: number;
    created_at: string;
    date_time: string;
    description: string;
    host: User;
    id: number;
    updated_at: string;
    user_id: number;
    zoom_link: string;
};

export type MeetingsMap = {
    [meetingId: number]: Meeting;
};

export type User = {
    created_at: string;
    email: string;
    email_verified_at: string;
    id: number;
    name: string;
    updated_at: string;
};

export type UserBookLike = Book & {
    pivot: {
        book_id: number;
        user_id: number;
    };
};

export type UserBookLikesMap = {
    [userBookLikeId: number]: UserBookLike;
};
