import React, { useEffect } from 'react';
import './TodoList.css'
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { markCompleted } from './actions'
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest } from './thunks';

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
    isLoading: state.isLoading,
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: text => dispatch(markCompleted(text)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);