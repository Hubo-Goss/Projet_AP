import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { login } from '../redux/actions/userActions';

export default function Login(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    let history = useHistory();

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
        login({ email }, { password }).then(() => {
            history.push('/calendar')
        });
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
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
                fullWidth
                variant="contained"
                color="primary"
            >
                Connexion
              </Button>
        </form>
        /* <form action="/login" method="post">
            <div class="title">
                <h3>Login</h3>
            </div>
            <div class="field">
                <label>Username:</label>
                <input type="text" name="username" />
                <br />
            </div>
            <div class="field">
                <label>Password:</label>
                <input type="password" name="password" required />
            </div>
            <div class="field">
                <input class="submit-btn" type="submit" value="Submit" required />
            </div>
            <label id="error-message"></label>
        </form> */
    );
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

connect(mapStateToProps, { login })(Login)