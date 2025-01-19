import { useContext, useEffect, useState } from 'react';
import { MeetingsContext } from '../context/MeetingsContext';
import { fetchAllMeetings } from '../api';
import MeetingCard from './MeetingCard';
import SearchBar from '../../shared/components/SearchBar';

const AllMeetingsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredMeetings, setFilteredMeetings] = useState(null);
    // const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);

    const { meetings, setMeetings } = useContext(MeetingsContext);

    useEffect(() => {
        fetchAllMeetings()
            .then((res) => {
                setMeetings(res);
                setFilteredMeetings(Object.values(res));
            })
            .catch(() => {
                console.log('error'); // TODO: error handling
            });
    }, []);

    useEffect(() => {
        if (meetings) {
            setFilteredMeetings(Object.values(meetings));
        }
    }, [meetings]);

    const filterMeetings = () => {
        const newMeetings = Object.values(meetings).filter(
            ({ author, title }) =>
                `${author.toLowerCase()} ${title.toLowerCase()}`.includes(
                    searchValue.toLowerCase()
                )
        );
        setFilteredMeetings(newMeetings);
    };

    return meetings ? (
        <>
            <div className="mt-12 mx-auto px-6 lg:px-8">
                <div className="flex flex-row justify-center gap-4">
                    <SearchBar
                        onChange={({ target: { value } }) =>
                            setSearchValue(value)
                        }
                        onSearch={(evt) => {
                            evt.preventDefault();
                            filterMeetings();
                        }}
                        placeholder="Search for a meeting"
                        value={searchValue}
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
