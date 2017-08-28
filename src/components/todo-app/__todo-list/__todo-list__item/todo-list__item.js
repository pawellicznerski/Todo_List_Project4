import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderTaskSection() {
        const { task, isCompleted } = this.props;

        const taskStyle = {
            color: isCompleted ? 'green' : 'red',
            cursor: 'pointer',
            backgroundColor:"lightGrey"
        };

        if (this.state.isEditing) {
            return (
                <div style={{backgroundColor:"lightGrey"}}>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" defaultValue={task} ref="editInput" />
                    </form>
                </div>
            );
        }

        return (
            <div style={taskStyle}
                onClick={this.props.toggleTask.bind(this,task)}
            >
                {task}
            </div>
        );
    }

    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <div style={{backgroundColor:"lightGrey"}}>
                    <button onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </div>
            );
        }

        return (
            <div style={{backgroundColor:"lightGrey"}}>
                <button onClick={this.onEditClick.bind(this)}>Edit</button>
                <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
            </div>
        );
    }

    render() {
        return (
            <li
              id={this.props.id}
              style={{marginTop: "10px",listStyleType:'none'}}
              draggable="true"
              onDragStart={this.props.dragStart.bind(this)}
              onDragEnd={this.props.dragEnd.bind(this)}

              onDragEnter={this.props.dragEnter.bind(this)}
              onDrop={this.props.dragDrop.bind(this)}
              onDragOver={this.props.dragOver.bind(this)}
              onDragLeave={this.props.dragLeave.bind(this)}

              >
                {this.renderTaskSection()}
                {this.renderActionsSection()}
            </li>
        );
    }

    onEditClick() {
        this.setState({ isEditing: true });
    }

    onCancelClick() {
        this.setState({ isEditing: false });
    }

    onSaveClick(event) {
        event.preventDefault();
        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false });
    }
}




              // onTouchStart={this.props.touchStart.bind(this)}
              // onTouchMove={this.props.touchMove.bind(this)}
              // onTouchEnd={this.props.touchEnd.bind(this)}
