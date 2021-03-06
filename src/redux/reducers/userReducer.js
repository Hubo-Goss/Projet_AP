import { LOGIN_USER, LOGOUT_USER } from "../actions/userActions";

//Permet d'utiliser les fonctions de userActions.js
const initialState = { userInfo: null };
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { userInfo: action.payload.user };
        case LOGOUT_USER:
            return { userInfo: null };
        default:
            return state;
    }
}