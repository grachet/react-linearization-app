// Store/configureStore.js

import { createStore } from 'redux';
import setAppState from "./Reducers/appStateReducer";

export default createStore(setAppState)