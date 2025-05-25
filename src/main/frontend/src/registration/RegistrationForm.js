import {useState} from "react";

export default function RegistrationForm({onRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function register() {
        const response = await fetch('/participants', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login: email, password})
        });

        if (response.ok) {
            onRegister(email);
        } else {
            alert('Nie udało się zarejestrować');
        }
    }

    return <div>
        <h3>Rejestracja</h3>
        <input type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Hasło" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={register}>Zarejestruj się</button>
    </div>
}
