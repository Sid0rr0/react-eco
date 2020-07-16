import React from 'react';
import './TodoList.css'
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { removeTodo } from './actions'
import { connect } from 'react-redux';

const TodoList =  ({ todos = [], onRemovePressed }) => (
    <div className="list-wrapper">
        <NewTodoForm />
        {todos.map((todo, index) => <TodoListItem todo={todo} key={index} onRemovePressed={onRemovePressed} />)}
    </div>
)

const mapStateToProps = state => ({
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);