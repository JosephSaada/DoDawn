import React, { useState } from 'react';

function Register() {
    const [message, setMessage] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        // Handle registration logic here
        
        // Set the success message
        setMessage('New account created!');
    };

    return (
        <main style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="Full Name" required style={{ padding: '10px' }} />
                <input type="email" placeholder="Email" required style={{ padding: '10px' }} />
                <input type="password" placeholder="Create Password" required style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
            {message && <p style={{ marginTop: '20px', color: 'green', textAlign: 'center', padding: '10px', border: '1px solid green', borderRadius: '4px', backgroundColor: '#e0ffe0' }}>{message}</p>}
        </main>
    );
}

export default Register;
