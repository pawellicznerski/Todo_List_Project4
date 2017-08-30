import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            value:this.props.task
        };
    }

// a fn which deals with rendering only text in a task section. there are two versions editable and not editable
    renderTaskSection() {
        const { task, isCompleted } = this.props;
        const taskStyle = {
            color: isCompleted ? 'green' : 'red',
            cursor: 'pointer',
        };

        if (this.state.isEditing) {
            return (
                <div>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" value={this.state.value} onChange={this.onChange.bind(this)} />
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
//updating the task's text value
    onChange(event){
      this.setState({ value: event.target.value });
    }
// a fn which deals with rendering only buttons in a task section. there are two versions save/cancel and edit/delete
    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <div>
                    <button onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </div>
            );
        }

        return (
            <div>
                <button onClick={this.onEditClick.bind(this)}>Edit</button>
                <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
            </div>
        );
    }
// a part resposible for rendering a whole element
    render() {
        return (
            <li
              className="todo-app__main__todo-list__item"
              id={this.props.id}

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
  // fn which deals with editing text
    onEditClick(e) {
      e.preventDefault();
      this.props.dropBlockOnEdit(true);
      this.setState({ isEditing: true });
    }
    // fn which deals with canceling the editing mode
    onCancelClick() {
        this.setState({ isEditing: false });
        this.props.dropBlockOnEdit(false);
    }
    // fn which deals with saving the editing mode. The fn triggers fn saveTask() recived in props from todo-app
    onSaveClick(event) {
        event.preventDefault();
        const oldTask = this.props.task;
        const newTask = this.state.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false });
    }
}




              // onTouchStart={this.props.touchStart.bind(this)}
              // onTouchMove={this.props.touchMove.bind(this)}
              // onTouchEnd={this.props.touchEnd.bind(this)}
