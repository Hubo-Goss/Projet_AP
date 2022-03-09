import { combineReducers } from "redux";
import userReducer from "./userReducer";
// import storeReducer from "./storeReducer";

export default combineReducers({
    user: userReducer,
    // store: storeReducer,
})