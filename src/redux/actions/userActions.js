import axios from 'axios';

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const login = (email, password) => (dispatch) => {
    return axios.post("http://localhost:5000/api/users/login", {
        email: email,
        password: password
    }).then((result) => {
        return dispatch({ type: LOGIN_USER, payload: result.data })
    })
}

export const logout = (email, password) => (dispatch) => {
    return axios.post('http://localhost:5000/api/users/logout').then((result, err) => {
        return dispatch({ type: LOGOUT_USER })
    })
}
export const checkLoggedIn = () => (dispatch) => {
    axios.get("http://localhost:5000/api/users").then((result) => {
        return dispatch({ type: LOGIN_USER, payload: result.data })
    })
}