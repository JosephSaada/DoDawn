import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/task-manager">Manage Tasks</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
