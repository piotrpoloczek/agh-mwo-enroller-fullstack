import "milligram";
import './App.css';
import {useState} from "react";
import LoginForm from "./login/LoginForm";
import RegistrationForm from "./registration/RegistrationForm";
import UserPanel from "./UserPanel";

function App() {
    const [loggedIn, setLoggedIn] = useState('');
    const [registerMode, setRegisterMode] = useState(false);

    function login(email) {
        setLoggedIn(email);
    }

    function logout() {
        localStorage.removeItem('jwt');
        setLoggedIn('');
    }

    return (
        <div>
            <h1>System do zapisów na zajęcia</h1>
            {!loggedIn && (
                registerMode
                    ? <RegistrationForm onRegister={(email) => {
                        setRegisterMode(false);
                        alert('Zarejestrowano. Teraz się zaloguj.');
                    }} />
                    : <LoginForm onLogin={login} />
            )}
            {!loggedIn && (
                <button onClick={() => setRegisterMode(!registerMode)}>
                    {registerMode ? 'Masz konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
                </button>
            )}
            {loggedIn && <UserPanel username={loggedIn} onLogout={logout}/>}
        </div>
    );
}

export default App;
