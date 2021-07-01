import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

export default function Navbar() {
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(logout())
    }

    const user = useSelector(state => state.user.userInfo)

    const createLesson = (
        <li className="navbar-item">
            <Link to="/create_lesson" className="nav-link">Créer une leçon</Link>
        </li>
    )

    const createUser = (
        <li className="navbar-item">
            <Link to="/create_user" className="nav-link">Créer un utilisateur</Link>
        </li>
    )

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/calendar" className="navbar-brand">Calendrier</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {user.role === 'Professor' || user.role === 'Admin' ? createLesson : ''}
                    {user.role === 'Admin' ? createUser : ''}
                    <li className="navbar-item">
                        <Link to="/my-lessons" className="nav-link">Mes leçons</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" className="nav-link" onClick={() => handleLogout()}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );

}

