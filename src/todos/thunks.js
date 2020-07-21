import { loadTodosInProgress, loadTodosSuccess, loadTodosFailure } from './actions';

export const loadTodos = () => async (dispach, getState) => {
    try {
        dispach(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();

        dispach(loadTodosSuccess(todos));
    } catch(e) {
        dispach(loadTodosFailure);
        dispach(displayAlert(e));
    }
};


export const displayAlert = text => () => {
    alert(text);
};