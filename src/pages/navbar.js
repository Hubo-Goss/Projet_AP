import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

export default function Navbar() {
    const dispatch = useDispatch()

    //Permet de se déconnecter
    function handleLogout() {
        dispatch(logout())
    }

    //Va chercher les infos du user et les save dans user
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

    const subjectsManager = (
        <li className="navbar-item">
            <Link to="/subjects_manager" className="nav-link">Gérer les matières</Link>
        </li>
    )

    const statistiques = (
        <li className="navbar-item">
            <Link to="/statistics" className="nav-link">Statistiques</Link>
        </li>
    )

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/calendar" className="navbar-brand">Calendrier</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {user.role === 'Professor' || user.role === 'Admin' ? createLesson : ''}
                    {user.role === 'Admin' ? createUser : ''}
                    {user.role === 'Admin' ? subjectsManager : ''}
                    {user.role === 'Admin' ? statistiques : ''}
                    <li className="navbar-item">
                        <Link to="/my_lessons" className="nav-link">Mes leçons</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" className="nav-link" onClick={() => handleLogout()}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );

}

