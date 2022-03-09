import React, { useState } from 'react';
import axios from 'axios';
import ClassesList from '../components/classes-list';
import RolesList from '../components/roles-list';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function CreateUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [classe, setClasse] = useState('');
    const [role, setRole] = useState('');
    const [open, setOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarText, setSnackbarText] = useState('User added!');

    function onChangeFirstName(e) {
        setFirstName(e.target.value)
        console.log(e.target.value)
    }

    function onChangeLastName(e) {
        setLastName(e.target.value)
        console.log(e.target.value)
    }

    function onChangeEmail(e) {
        setEmail(e.target.value)
        console.log(e.target.value)
    }

    function onChangePassword(e) {
        setPassword(e.target.value)
        console.log(e.target.value)
    }

    function onChangeClasse(classe) {
        setClasse(classe)
        console.log(classe)
    }

    function onChangeRole(role) {
        setRole(role)
        console.log(role)
    }

    function handleClose() {
        setOpen(false)
    }

    function changeSnackbar(severity) {
        setSnackbarSeverity(severity)
        if (severity === "error")
            setSnackbarText("Unauthorized access.")
        else
            setSnackbarText("User added!")
    }

    function onSubmit(e) {
        e.preventDefault();
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            classe: classe,
            role: role
        };
        axios.post('http://localhost:5000/api/users/add', newUser, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                if (res.data === "Unauthorized")
                    changeSnackbar("error")
                else
                    changeSnackbar("success")
                setOpen(true)
            });

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className="box">
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
                    <label>Email : </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={email}
                        onChange={onChangeEmail}
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
                    <ClassesList onChange={onChangeClasse} classe={'Select a class'} />
                </div>
                <div className="form-group">
                    <label>Role : </label>
                    <RolesList onChange={onChangeRole} role_={'Select a role'} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Créer l'utilisateur" className="btn btn-primary" />
                </div>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarSeverity}>
                    {snackbarText}
                </Alert>
            </Snackbar>
        </div>
    )
}
