import { createStore, combineReducers } from 'redux';
import { todos } from './todos/reducers';

const reducers = {
    todos,
};

const groupReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);