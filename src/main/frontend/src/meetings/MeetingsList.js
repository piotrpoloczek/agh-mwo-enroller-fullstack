export default function MeetingsList({ meetings, username, onDelete, onJoin, onLeave }) {
    return (
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Uczestnicy</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {meetings.map((meeting, index) => {
                const isUserJoined = meeting.participants?.some(p => p.login === username);
                return (
                    <tr key={index}>
                        <td>{meeting.id}</td>
                        <td>{meeting.title}</td>
                        <td>{meeting.description}</td>
                        <td>{meeting.participants?.length || 0}</td>
                        <td>
                            {isUserJoined ? (
                                <button onClick={() => onLeave(meeting)}>Wypisz się</button>
                            ) : (
                                <button onClick={() => onJoin(meeting)}>Zapisz się</button>
                            )}
                            <button
                                onClick={() => onDelete(meeting)}
                                disabled={meeting.participants?.length > 0}
                            >
                                Usuń
                            </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
