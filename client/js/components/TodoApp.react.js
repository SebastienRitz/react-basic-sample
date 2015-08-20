import React from 'react';
import TodoItem from './TodoItem.react'
import TodoStore from '../stores/TodoStore';

export default class TodoApp extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      todos: TodoStore.getAll()
    };

    this.onChange = ::this.onChange;
  }

  componentDidMount () {
    TodoStore.addChangeListener(this.onChange);
  }

  componentWillUnmount () {
    TodoStore.removeChangeListener(this.onChange);
  }

  render () {

    var todos = this.state.todos;
    var htmlTodos = [];

    for (var key in todos) {
      htmlTodos.push(<TodoItem key={key} {...todos[key]}/>);
    }

    return (
      <ul id="todo-list">
        {htmlTodos}
      </ul>
    );

  }

  onChange () {
    this.setState({
      todos: TodoStore.getAll()
    });
  }

};
