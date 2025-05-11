export default function MeetingsList(props) {
    return (
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Usuń</th>
            </tr>
            </thead>
            <tbody>
            {
                props.meetings.map((meeting, index) => <tr key={index}>
                    <td>{meeting.id}</td>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td><button onClick={() => props.onDelete(meeting)}>Usuń</button></td>
                </tr>)
            }
            </tbody>
        </table>
    );
}
