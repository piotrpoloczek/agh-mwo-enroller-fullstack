// src/UserPanel.js
import MeetingsPage from "./meetings/MeetingsPage";

export default function UserPanel({ username, token, onLogout }) {
    console.log("Rendering UserPanel for:", username);
    return (
        <div>
            <h2>Witaj {username}!</h2>
            <button onClick={onLogout}>Wyloguj</button>
            <MeetingsPage username={username} token={token} />
        </div>
    );
}
