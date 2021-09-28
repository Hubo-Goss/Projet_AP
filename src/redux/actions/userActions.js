import axios from 'axios';

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

//Actions disponibles pour le user
//Permet de se connecter avec un mail et un password et enregistre les infos du user
export const login = (email, password) => (dispatch) => {
    console.log('loggin')
    return axios.post("http://localhost:5000/api/users/login", {
        email: email,
        password: password
    }, { withCredentials: true, credentials: 'include' }).then((result) => {
        return dispatch({ type: LOGIN_USER, payload: result.data })
    })
}

//Permet de se connecter et d'oublier les infos du user
export const logout = () => (dispatch) => {
    return axios.post('http://localhost:5000/api/users/logout').then((result, err) => {
        return dispatch({ type: LOGOUT_USER })
    })
}

//Permet de se connecter à partir d'un cookie existant
export const checkLoggedIn = () => (dispatch) => {
    console.log("dispatch checkLoggedIn")
    axios.get("http://localhost:5000/api/users/", { withCredentials: true }).then((result) => {
        console.log(result)
        return dispatch({ type: LOGIN_USER, payload: result.data })
    })
}