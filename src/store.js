import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from "./redux/reducers/index";

const initialState = {};
export default createStore(rootReducer, initialState, applyMiddleware(thunk));