import { createTodo, loadTodosInProgress, loadTodosSuccess, loadTodosFailure } from './actions';

export const loadTodos = () => async (dispach, getState) => {
    try {
        dispach(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();
        
        dispach(loadTodosSuccess(todos));
    } catch(e) {
        dispach(loadTodosFailure());
        dispach(displayAlert(e));
    }
};

export const addTodoRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body,
        });

        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch(e) {
        dispatch(displayAlert(e));
    }
}


export const displayAlert = text => () => {
    alert(text);
};