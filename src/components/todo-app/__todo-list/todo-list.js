import _ from 'lodash';
import React from 'react';
import TodosListHeader from './__todo-list__header/todo-list__header.js';
import TodosListItem from './__todo-list__item/todo-list__item.js';

export default class TodosList extends React.Component {
    renderItems() {
        const props = _.omit(this.props, 'todos');

        return _.map(this.props.todos, (todo, index) => <TodosListItem id={todo.id} key={index} {...todo} {...props} />);
    }

    render() {
        return (
            <div>
                <TodosListHeader />
                <ul>
                    {this.renderItems()}
                </ul>
            </div>
        );
    }
}
