import React, { useEffect } from 'react';
import styled from 'styled-components';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest, markCompletedTodoRequest } from './thunks';
import { getTodosLoading, getCompletedTodos, getIncompleteTodos } from './selectors';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({ completedTodos, incompletedTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <ListWrapper>
            <NewTodoForm />
            <h3>Incompleted Todos</h3>
            {incompletedTodos.map((todo, index) => <TodoListItem todo={todo} key={index} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}
            <h3>Completed Todos</h3>
            {completedTodos.map((todo, index) => <TodoListItem todo={todo} key={index} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}

        </ListWrapper>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markCompletedTodoRequest(id)),
    
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);