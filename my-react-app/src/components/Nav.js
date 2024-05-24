// Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Make sure the path is correct based on your structure

function Nav() {
    const { isAuthenticated } = useAuth();

    return (
        <nav style={{ backgroundColor: '#4285F4', padding: '10px 0', display: 'flex', justifyContent: 'center' }}>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '10px' }}>
                {!isAuthenticated && (
                    <>
                        <li>
                            <Link 
                                to="/login" 
                                className="nav-button"
                                style={{ 
                                    color: 'white', 
                                    padding: '10px 20px', 
                                    textDecoration: 'none', 
                                    borderRadius: '4px',
                                    textAlign: 'center',
                                    backgroundColor: '#4285F4'
                                }}
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/register" 
                                className="nav-button"
                                style={{ 
                                    color: 'white', 
                                    padding: '10px 20px', 
                                    textDecoration: 'none', 
                                    borderRadius: '4px',
                                    textAlign: 'center',
                                    backgroundColor: '#4285F4'
                                }}
                            >
                                Register
                            </Link>
                        </li>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <li>
                            <Link 
                                to="/task-manager" 
                                className="nav-button"
                                style={{ 
                                    color: 'white', 
                                    padding: '10px 20px', 
                                    textDecoration: 'none', 
                                    borderRadius: '4px',
                                    textAlign: 'center',
                                    backgroundColor: '#4285F4'
                                }}
                            >
                                Manage Tasks
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/user-tasks" 
                                className="nav-button"
                                style={{ 
                                    color: 'white', 
                                    padding: '10px 20px', 
                                    textDecoration: 'none', 
                                    borderRadius: '4px',
                                    textAlign: 'center',
                                    backgroundColor: '#4285F4'
                                }}
                            >
                                User Tasks
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Nav;
