import axios from 'axios';

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const login = (email, password) => (dispatch) => {
    return axios.post("/user/login", {
        email: email,
        password: password
    }).then((result) => {
        return dispatch({ type: LOGIN_USER, payload: result.data })
    })
}

export const logout = (email, password) => (dispatch) => {
    return axios.post('/user/logout').then((result, err) => {
        return dispatch({ type: LOGOUT_USER })
    })
}
export const checkLoggedIn = () => (dispatch) => {
    axios.get("/user").then((result) => {
        return dispatch({ type: LOGIN_USER, payload: result.data })
    })
}