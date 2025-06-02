import { createStore } from 'redux';
import userReducer from './reducer';

const store = createStore(userReducer);

export default store;
