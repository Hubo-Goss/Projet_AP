import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">Login</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/calendar" className="nav-link">Calendrier</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create_lesson" className="nav-link">Créer une leçon</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create_user" className="nav-link">Créer un utilisateur</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );

}

