export const SET_CURRENT_STORE = "SET_CURRENT_STORE";
export const REMOVE_CURRENT_STORE = "REMOVE_CURRENT_STORE";

export const setCurrentStore = (obj) => (dispatch) => {
    return dispatch({ type: SET_CURRENT_STORE, payload: obj })
}