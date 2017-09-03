import React from 'react';
// import _ from "lodash";


export default class TodoFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          value:''
        };
    }

// redering a form which all the navigates
    render() {
      const {menuActive}= this.props;
        return (
          <form
            className={
              menuActive
              ?"todo-app__header__filters__el  todo-app__header__filters__el__finder"
              :"todo-app__header__filters__el todo-app__header__filters__el__finder todo-app__header__filters__el__finder_hidden"
            }
            onBlur={this.handleOnBlur.bind(this)}
            onSubmit={this.handleSearch.bind(this)}>
              <input
                className="todo-app__header__filters__el__finder__search__input"
                type="text" placeholder="search for..."
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                />
              <button
                className="todo-app__header__filters__el__finder__search__button"></button>
          </form>
        );
    }
    //function which renders error where the form is filled incorrectly
    renderError(validateInput) {
        (!validateInput)
        ?this.props.renderHeaderError('')
        :this.props.renderHeaderError(validateInput);
    }
    //function which renders error where the form is filled incorrectly
    handleOnBlur(e) {
      e.preventDefault();
      this.props.renderHeaderError('');
    }

    handleChange(event) {
      event.preventDefault();
       this.setState({value: event.target.value});
     }

    handleSearch(event) {
      event.preventDefault();
        const task = this.state.value;
        const validateInput = this.validateInput(task);

        if (validateInput) {
          this.setState({ error: validateInput });
          this.renderError(validateInput);
          return;
        }

        this.setState({error: null, value:''});
        this.props.findTask(task);
    }

    // triggered by handleCreate fn, it aims at providing error text if it is necessary
      validateInput(task) {
          if (!task) {
              return 'Please enter a task.';
          } else {
              return null;
          }
      }
    }
