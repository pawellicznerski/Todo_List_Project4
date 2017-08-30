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
        return (
          <form  className="header__filters__el header__filters__el__search"  onSubmit={this.handleSearch.bind(this)}>
              <input className="header__filters__el__search__input"  type="text" placeholder="search for..." value={this.state.value} onChange={this.handleChange.bind(this)} />
              <button className="header__filters__el__search__button"></button>
          </form>
        );
    }
    //function which renders error where the form is filled incorrectly
    renderError(validateInput) {
        if (!validateInput) {
          this.props.renderHeaderError('');
        } else {
          console.log("nie ma wartości w formularzu");
          this.props.renderHeaderError(validateInput);
        }
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

      this.setState({
        error: null,
        value:''
      });

      this.props.findTask(task);
      // console.log(event.target.value);
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
