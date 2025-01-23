import { debounce } from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';
import MeetingsContext from '../MeetingsContext';
import UserSessionContext from '../../shared/UserSessionContext';
import SearchBar from '../../shared/components/SearchBar';
import FilterBar from '../../shared/components/FilterBar';
import Button from '../../shared/components/Button';
import LoadingWrapper from '../../shared/components/LoadingWrapper';
import ErrorMessage from '../../shared/components/ErrorMessage';
import { fetchUserSession } from '../../shared/api';
import { fetchAllMeetings } from '../api';
import MeetingCard from './MeetingCard';
import AddMeetingModal from './AddMeetingModal';

const AllMeetingsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const { meetings, setMeetings } = useContext(MeetingsContext);
    const { setUserSession } = useContext(UserSessionContext);

    let filteredMeetings = meetings ? Object.values(meetings) : [];

    useEffect(() => {
        if (!meetings) {
            setLoading(true);
            fetchAllMeetings()
                .then((res) => {
                    setMeetings(res);
                    setLoading(false);
                })
                .catch(() => {
                    console.log('error'); // TODO: error handling
                    setLoading(false);
                });
        }

        fetchUserSession()
            .then((res) => {
                setUserSession(res);
            })
            .catch((err) => console.log(err));
    }, []);

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
            <div id="header" className="flex flex-row justify-between">
                <h1 className="text-3xl text-midnight font-bold mb-5">
                    Meetings
                </h1>
                <Button
                    use="secondary"
                    onClick={() => setShowAddMeetingModal(true)}
                >
                    Create a meeting
                </Button>
            </div>
            <FilterBar
                start={
                    <SearchBar
                        onChange={debouncedSearch}
                        placeholder="Search for a meeting"
                    />
                }
            />
            <div className="mt-12 flex flex-column flex-col gap-3 flex-wrap">
                <LoadingWrapper loading={loading}>
                    {meetings ? (
                        <>
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
                        </>
                    ) : (
                        <ErrorMessage />
                    )}
                </LoadingWrapper>
            </div>
            {showAddMeetingModal && (
                <AddMeetingModal
                    onClose={() => setShowAddMeetingModal(false)}
                />
            )}
        </div>
    );
};

export default AllMeetingsPage;
