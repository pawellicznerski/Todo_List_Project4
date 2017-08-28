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
          <form onSubmit={this.handleSearch.bind(this)}>
              <input type="text" placeholder="Search for..." value={this.state.value} onChange={this.handleChange.bind(this)} />
              <button>Search</button>
              {this.renderError()}
          </form>
        );
    }
    //function which renders error where the form is filled incorrectly
    renderError() {
        if (!this.state.error) { return null; }
        return <div style={{ color: 'red' }}>{this.state.error}</div>;
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
