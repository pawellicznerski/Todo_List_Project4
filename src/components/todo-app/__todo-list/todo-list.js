import _ from 'lodash';
import React from 'react';
import TodosListItem from './__todo-list__item/todo-list__item.js';

export default class TodosList extends React.Component {
    renderItems() {
        const props = _.omit(this.props, 'todos');

        return _.map(this.props.todos, (todo, index) => todo?<TodosListItem id={todo.id} key={index} {...todo} {...props} />: null);
    }

    render() {
        return (
            <div className="todo-app__main__todo-list">
                <ul className="todo-app__main__todo-list__container">
                    {this.renderItems()}
                </ul>
            </div>
        );
    }
}
