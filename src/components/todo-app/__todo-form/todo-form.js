import React from 'react';
import _ from "lodash";


export default class CreateTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            value:''
        };
    }

//function which renders error where the form is filled incorrectly
    renderError() {
        if (!this.state.error) { return null; }

        return <div style={{ color: 'red' }}>{this.state.error}</div>;
    }

// redering a form which all the navigates
    render() {
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <input type="text" placeholder="What do I need to do?" value={this.state.value} onChange={this.handleChange.bind(this)} />
                <button>Create</button>
                {this.renderError()}
            </form>
        );
    }

//watches value change in input
    handleChange(event) {
      this.setState({value: event.target.value});
    }

// a function which validates data from the form, once the are ok the fn triggers createTast() fn from todo-app, in case it is from it runs renderError() fn
    handleCreate(event) {
        event.preventDefault();
        // const createInput = this.refs.createInput;
        const task = this.state.value;
        const validateInput = this.validateInput(task);
        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }
        this.setState({
          error: null,
          value:''
         });
        this.props.createTask(task);
        // this.refs.createInput.value = '';
    }

// triggered by handleCreate fn, it aims at providing error text if it is necessary
    validateInput(task) {
        if (!task) {
            return 'Please enter a task.';
        } else if (_.find(this.props.todos, todo => todo.task === task)) {
            return 'Task already exists.';
        } else {
            return null;
        }
    }
}
