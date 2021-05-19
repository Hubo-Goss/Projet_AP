import React, { useEffect } from 'react';

export default function Login(props) {

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const info = urlParams.get('info');

        if (info) {
            const errorMessage = document.getElementById("error-message");
            errorMessage.innerText = info;
            errorMessage.style.display = "block";
        }
    })

    return (
        <form action="/login" method="post">
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
        </form>
    );
}