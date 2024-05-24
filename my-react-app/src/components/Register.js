import React from 'react';

function Register() {
    const handleRegister = (event) => {
        event.preventDefault();
        // Handle registration logic here
    };

    return (
        <main style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="Full Name" required style={{ padding: '10px' }} />
                <input type="email" placeholder="Email" required style={{ padding: '10px' }} />
                <input type="password" placeholder="Create Password" required style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
        </main>
    );
}

export default Register;
