// store.js
import { createStore } from 'redux';
import userReducer from './reducer';
import { loadState, saveState } from './localStorage';

// Load from localStorage on startup
const persistedState = loadState();

const store = createStore(userReducer, persistedState);

// Save to localStorage on every state change
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
