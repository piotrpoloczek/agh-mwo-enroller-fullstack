// src/login/LoginForm.js
import { useState } from "react";

export default function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        console.log("Attempting login for:", email);
        const response = await fetch('/tokens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login response:", data);
            onLogin(email, data.token);
        } else {
            alert('Niepoprawny login lub hasło');
            console.warn("Login failed for:", email);
        }
    }

    return (
        <div>
            <h3>Logowanie</h3>
            <input type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Hasło" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Zaloguj</button>
        </div>
    );
}