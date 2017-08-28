import React from 'react';
import _ from "lodash";


export default class TodoFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value:'all'
        };
    }
    handleChange(event) {
      event.preventDefault();
       this.setState({value: event.target.value});
       this.props.filterTasks(event.target.value);
       console.log(event.target.value);
     }
// redering a form which all the navigates
    render() {
        return (
          <select value={this.state.value} onChange={this.handleChange.bind(this)}>
            <option value="all">all</option>
            <option value="complete">complete</option>
            <option value="incomplete">incomplete</option>
          </select>
        );
    }

}
