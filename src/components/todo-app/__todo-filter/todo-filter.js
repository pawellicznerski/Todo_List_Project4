import React from 'react';
// import _ from "lodash";


export default class TodoFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value:this.props.selectionValue,
        };
    }

    //  componentDidUpdate(selectionActive){
    //    if(!this.props.selectionActive){
    //      this.setState({
    //        value:'all'
    //      })
    //      this.props.filterTasks(this.state.value);
    //    }
    //  }
    // shouldComponentUpdate(selectionActive, value){
    //
    // }
    //  componentWillUpdate(selectionActive, value){
    //    if(!this.props.selectionActive){
    //      this.setState({
    //        value:'all'
    //      })
    //      this.props.filterTasks(this.state.value);
    //    }
    //  }
// redering a form which all the navigates
    render() {
        return (
          <p></p>
        );
    }

}

// handleSelectChange(event) {
//   event.preventDefault();
//    this.setState({value: event.target.value});
//    this.filterTasks(event.target.value);
//  }


// <select value={this.state.value} onChange={this.handleChange.bind(this)}>
//   <option value="all">all</option>
//   <option value="complete">complete</option>
//   <option value="incomplete">incomplete</option>
// </select>
