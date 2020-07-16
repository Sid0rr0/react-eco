import { createStore, combineReducers } from 'redux';

const reducers = {};

const groupReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);