// src/components/Register.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

function Register() {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        await register(name, email, password);
        setMessage('New account created!');
    };

    return (
        <main style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: '10px' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '10px' }}
                />
                <input
                    type="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
            {message && <p style={{ marginTop: '20px', color: 'green', textAlign: 'center', padding: '10px', border: '1px solid green', borderRadius: '4px', backgroundColor: '#e0ffe0' }}>{message}</p>}
        </main>
    );
}

export default Register;
