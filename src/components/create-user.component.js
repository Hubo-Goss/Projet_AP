import React, { useState } from 'react';
import axios from 'axios';
import ClassesList from './lists/classes-list.component';
import RolesList from './lists/roles-list.component';

export default function CreateUser(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [classe, setClasse] = useState('');
    const [role, setRole] = useState('');

    function onChangeFirstName(e) {
        setFirstName(e.target.value)
    }

    function onChangeLastName(e) {
        setLastName(e.target.value)
    }

    function onChangeLogin(e) {
        setLogin(e.target.value)
    }

    function onChangePassword(e) {
        setPassword(e.target.value)
    }

    function onChangeClasse(classe) {
        setClasse(classe)
    }

    function onChangeRole(role) {
        setRole(role)
    }

    function onSubmit(e) {
        e.preventDefault();
        const newUser = {
            firstName: { firstName },
            lastName: { lastName },
            login: { login },
            password: { password },
            classe: { classe },
            role: { role }
        };
        axios.post('http://localhost:5000/users/add', newUser)
            .then(res => console.log(res.data));
    }

    return (
        <div>
            <h3>Créer un nouvel utilisateur</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Prénom : </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={firstName}
                        onChange={onChangeFirstName}
                    />
                </div>
                <div className="form-group">
                    <label>Nom : </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={lastName}
                        onChange={onChangeLastName}
                    />
                </div>
                <div className="form-group">
                    <label>Identifiant : </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={login}
                        onChange={onChangeLogin}
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe : </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className="form-group">
                    <label>Classe : </label>
                    <ClassesList onChange={onChangeClasse} classe={''} />
                </div>
                <div className="form-group">
                    <label>Role : </label>
                    <RolesList onChange={onChangeRole} role={''} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Créer l'utilisateur" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
