import React from 'react';

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <main>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Enter your email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Log In</button>
      </form>
    </main>
  );
}

export default Login;
