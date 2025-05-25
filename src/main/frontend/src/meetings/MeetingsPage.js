import { useEffect, useState } from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({ username }) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        fetchMeetings();
    }, [token]);

    async function fetchMeetings() {
        try {
            const response = await fetch(`/meetings`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch meetings");
            }

            const rawMeetings = await response.json();

            // Fetch participants for each meeting
            const meetingsWithParticipants = await Promise.all(
                rawMeetings.map(async (meeting) => {
                    const resp = await fetch(`/meetings/${meeting.id}/participants`, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    const participants = resp.ok ? await resp.json() : [];
                    return { ...meeting, participants };
                })
            );

            setMeetings(meetingsWithParticipants);
        } catch (error) {
            console.error("Error loading meetings:", error);
        }
    }

    async function handleNewMeeting(meeting) {
        const response = await fetch('/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.ok) {
            await fetchMeetings();
            setAddingNewMeeting(false);
        } else {
            const error = await response.text();
            console.error('Failed to add meeting:', error);
        }
    }

    async function handleDeleteMeeting(meeting) {
        const response = await fetch(`/meetings/${meeting.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.ok) {
            await fetchMeetings();
        } else {
            const error = await response.text();
            console.error('Failed to delete meeting:', error);
        }
    }

    async function handleJoinMeeting(meeting) {
        const response = await fetch(`/meetings/${meeting.id}/participants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ login: username })
        });

        if (response.ok) {
            await fetchMeetings();
        } else {
            const error = await response.text();
            console.error('Failed to join meeting:', error);
        }
    }

    async function handleLeaveMeeting(meeting) {
        const response = await fetch(`/meetings/${meeting.id}/participants/${username}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.ok) {
            await fetchMeetings();
        } else {
            const error = await response.text();
            console.error('Failed to leave meeting:', error);
        }
    }

    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {addingNewMeeting ? (
                <NewMeetingForm onSubmit={handleNewMeeting} />
            ) : (
                <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
            )}
            {meetings.length > 0 && (
                <MeetingsList
                    meetings={meetings}
                    username={username}
                    onDelete={handleDeleteMeeting}
                    onJoin={handleJoinMeeting}
                    onLeave={handleLeaveMeeting}
                />
            )}
        </div>
    );
}
