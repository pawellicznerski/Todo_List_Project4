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
              ?"header__filters__el  header__filters__el__search"
              :"header__filters__el header__filters__el_hidden header__filters__el__search"
            }
            onBlur={this.handleOnBlur.bind(this)}
            onSubmit={this.handleSearch.bind(this)}>
              <input
                className="header__filters__el__search__input"
                type="text" placeholder="search for..."
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                />
              <button
                className="header__filters__el__search__button"></button>
          </form>
        );
    }
    //function which renders error where the form is filled incorrectly
    renderError(validateInput) {
        (!validateInput)
        ?this.props.renderHeaderError('')
        :console.log("nie ma wartości w formularzu"); this.props.renderHeaderError(validateInput);
    }
    //function which renders error where the form is filled incorrectly
    handleOnBlur(e) {
      e.preventDefault();
      console.log("renderOnBlur:");
      this.props.renderHeaderError('');
    }

    handleChange(event) {
      event.preventDefault();
       this.setState({value: event.target.value});
     }

    handleSearch(event) {
      event.preventDefault();
      console.log("this.props.menuActive",this.props.menuActive);
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
