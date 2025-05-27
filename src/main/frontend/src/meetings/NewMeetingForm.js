// src/meetings/NewMeetingForm.js
import { useState } from "react";

export default function NewMeetingForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function submit(event) {
        event.preventDefault();
        console.log("Submitting new meeting form:", { title, description });
        onSubmit({ title, description, participants: [] });
    }

    return (
        <form onSubmit={submit}>
            <h3>Dodaj nowe spotkanie</h3>
            <label>Nazwa</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            <label>Opis</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
            <button>Dodaj</button>
        </form>
    );
}