import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect, useDispatch } from 'react-redux';
import { login } from '../redux/actions/userActions';

export default function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const info = urlParams.get('info');

        if (info) {
            const errorMessage = document.getElementById("error-message");
            errorMessage.innerText = info;
            errorMessage.style.display = "block";
        }
    }, [])

    function onChangeEmail(e) {
        setEmail(e.target.value)
    }

    function onChangePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(login(email, password))
        history.push('/calendar')
    }

    return (
        <form id="loginForm" noValidate onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={onChangeEmail}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChangePassword}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                alignItem="center"
            >
                Connexion
            </Button>
        </form>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

connect(mapStateToProps, { login })(LoginPage)