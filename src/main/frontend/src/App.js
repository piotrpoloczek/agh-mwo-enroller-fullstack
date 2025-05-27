// src/App.js
import "milligram";
import './App.css';
import { useState, useEffect } from "react";
import LoginForm from "./login/LoginForm";
import RegistrationForm from "./registration/RegistrationForm";
import UserPanel from "./UserPanel";

function isTokenExpired(token) {
    if (!token) return true;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expired = payload.exp * 1000 < Date.now();
        console.log("Token expiry check:", expired);
        return expired;
    } catch (e) {
        console.error("Failed to decode token:", e);
        return true;
    }
}

function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("username") || '');
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    const [registerMode, setRegisterMode] = useState(false);

    useEffect(() => {
        if (isTokenExpired(token)) logout();
    }, [token]);

    function login(email, newToken) {
        console.log("Login success:", email);
        localStorage.setItem("jwt", newToken);
        localStorage.setItem("username", email);
        setLoggedIn(email);
        setToken(newToken);
    }

    function logout() {
        console.log("Logging out");
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        setLoggedIn('');
        setToken(null);
    }

    const isLoggedIn = loggedIn && token && !isTokenExpired(token);
    console.log("Is logged in:", isLoggedIn);

    return (
        <div>
            <h1>System do zapisów na zajęcia</h1>

            {!isLoggedIn && (
                registerMode ? (
                    <RegistrationForm onRegister={(email) => {
                        console.log("Registered:", email);
                        setRegisterMode(false);
                        alert('Zarejestrowano. Teraz się zaloguj.');
                    }} />
                ) : (
                    <LoginForm onLogin={login} />
                )
            )}

            {!isLoggedIn && (
                <button onClick={() => setRegisterMode(!registerMode)}>
                    {registerMode ? 'Masz konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
                </button>
            )}

            {isLoggedIn && <UserPanel username={loggedIn} token={token} onLogout={logout} />}
        </div>
    );
}

export default App;