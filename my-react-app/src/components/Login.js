import React from 'react';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        login();
        navigate('/'); // Redirect to the homepage or another page
    };

    return (
        <main style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <input type="email" placeholder="Enter your email" required style={{ padding: '10px', width: '100%' }} />
                <input type="password" placeholder="Password" required style={{ padding: '10px', width: '100%' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
                    Log In
                </button>
            </form>
        </main>
    );
}

export default Login;
