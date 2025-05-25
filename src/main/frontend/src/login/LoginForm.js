import {useState} from "react";

export default function LoginForm({onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        const response = await fetch('/tokens', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login: email, password})
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwt', data.token);
            onLogin(email);
        } else {
            alert('Niepoprawny login lub hasło');
        }
    }

    return <div>
        <h3>Logowanie</h3>
        <input type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Hasło" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Zaloguj</button>
    </div>
}
