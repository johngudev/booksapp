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
        filteredMeetings = Object.values(meetings).filter(
            ({ book: { title, author }, description }) =>
                `${author.toLowerCase()} ${title.toLowerCase()} ${description.toLowerCase()}`.includes(
                    searchValue.toLowerCase()
                )
        );
    }

    return (
        <div className="mt-12 max-w-screen-xl mx-auto px-6 lg:px-8">
            <h1 className="text-3xl text-midnight font-bold mb-5">Meetings</h1>
            <div id="filterBar" className="flex flex-row justify-start gap-4">
                <SearchBar
                    onChange={debouncedSearch}
                    placeholder="Search for a book"
                />
            </div>
            {meetings ? (
                <>
                    <div className="mt-12 flex flex-column flex-col gap-3 flex-wrap">
                        {filteredMeetings.length ? (
                            filteredMeetings.map((meeting) => {
                                const {
                                    attendees,
                                    book,
                                    date_time: meetingAt,
                                    description,
                                    host,
                                    id: meetingId,
                                    zoom_link: zoomLink,
                                } = meeting;
                                return (
                                    <MeetingCard
                                        attendees={attendees}
                                        book={book}
                                        description={description}
                                        host={host}
                                        key={meetingId}
                                        meetingAt={meetingAt}
                                        meetingId={meetingId}
                                        zoomLink={zoomLink}
                                    />
                                );
                            })
                        ) : (
                            <p>No results.</p>
                        )}
                    </div>
                </>
            ) : (
                <>Loading...</> // TODO: loading spinner
            )}
        </div>
    );
};

export default AllMeetingsPage;
