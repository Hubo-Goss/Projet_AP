import axios from 'axios';

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const login = (email, password) => (dispatch) => {
    console.log('loggin')
    return axios.post("http://localhost:5000/api/users/login", {
        email: email,
        password: password
    }, { withCredentials: true, credentials: 'include' }).then((result) => {
        return dispatch({ type: LOGIN_USER, payload: result.data })
    })
}

export const logout = () => (dispatch) => {
    return axios.post('http://localhost:5000/api/users/logout').then((result, err) => {
        return dispatch({ type: LOGOUT_USER })
    })
}
export const checkLoggedIn = () => (dispatch) => {
    console.log("dispatch checkLoggedIn")
    axios.get("http://localhost:5000/api/users/", { withCredentials: true }).then((result) => {
        return dispatch({ type: LOGIN_USER, payload: result.data })
    })
}