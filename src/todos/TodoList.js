import React, { useEffect } from 'react';
import './TodoList.css'
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest, markCompletedTodoRequest } from './thunks';
import { getTodos, getTodosLoading } from './selectors';

const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            {todos.map((todo, index) => <TodoListItem todo={todo} key={index} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}
        </div>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    todos: getTodos(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markCompletedTodoRequest(id)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);