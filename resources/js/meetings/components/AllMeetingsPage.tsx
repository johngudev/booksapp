import { debounce } from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';
import { MeetingsContext } from '../context/MeetingsContext';
import { fetchAllMeetings } from '../api';
import MeetingCard from './MeetingCard';
import SearchBar from '../../shared/components/SearchBar';

const AllMeetingsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const { meetings, setMeetings } = useContext(MeetingsContext);

    let filteredMeetings = meetings ? Object.values(meetings) : [];

    useEffect(() => {
        fetchAllMeetings()
            .then((res) => {
                setMeetings(res);
            })
            .catch(() => {
                console.log('error'); // TODO: error handling
            });
    }, []);

    useEffect(() => {
        if (meetings) {
        }
    }, [meetings]);

    const handleSearch = ({ target: { value } }) => setSearchValue(value);

    const debouncedSearch = useMemo(() => {
        return debounce(handleSearch, 300);
    }, []);

    useEffect(() => debouncedSearch.cancel());

    if (searchValue !== '') {
        filteredMeetings = Object.values(meetings).filter(({ description }) =>
            description.toLowerCase().includes(searchValue.toLowerCase())
        );
    }
    console.log(meetings);

    return meetings ? (
        <>
            <div className="mt-12 max-w-screen-xl mx-auto px-6 lg:px-8">
                <div className="flex flex-row justify-start gap-4 md:mx-4">
                    <SearchBar
                        onChange={debouncedSearch}
                        placeholder="Search for a book"
                    />
                    <button
                        className="underline hover:no-underline transition ease-in-out delay-150 duration-300"
                        // onClick={() => setShowAddMeetingModal(true)}
                    >
                        Add meetings
                    </button>
                </div>
                <div className="mt-12 flex md:flex-row flex-column flex-col gap-3 flex-wrap justify-center">
                    {filteredMeetings.length ? (
                        filteredMeetings.map((meeting) => {
                            const {
                                book_id: bookId,
                                date_time: meetingAt,
                                description,
                                id: meetingId,
                                user_id: userId,
                                zoom_link: zoomLink,
                            } = meeting;
                            return (
                                <MeetingCard
                                    bookId={bookId}
                                    description={description}
                                    key={meetingId}
                                    meetingAt={meetingAt}
                                    meetingId={meetingId}
                                    userId={userId}
                                    zoomLink={zoomLink}
                                />
                            );
                        })
                    ) : (
                        <p>No results.</p>
                    )}
                </div>
            </div>
        </>
    ) : (
        <>Loading...</> // TODO: loading spinner
    );
};

export default AllMeetingsPage;
