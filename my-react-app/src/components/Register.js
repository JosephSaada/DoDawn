import React from 'react';

function Register() {
  const handleRegister = (event) => {
    event.preventDefault();
    // Handle registration logic here
  };

  return (
    <main>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Create Password" required />
        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default Register;
