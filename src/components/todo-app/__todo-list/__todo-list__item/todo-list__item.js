import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            value:this.props.task,
            isBlockingClick: false
        };
    }

// a fn which deals with rendering only text in a task section. there are two versions editable and not editable
    renderTaskSection() {
      const { task, isCompleted } = this.props;

        if (this.state.isEditing) {
            return (
                <div className="todo-app__main__todo-list__item__text-container">
                    <form
                      className="todo-app__main__todo-list__item__text-container__form"
                      onSubmit={this.onSaveClick.bind(this)}>
                        <input
                          autoFocus
                          className="todo-app__main__todo-list__item__text-container__form__input"
                          type="text"
                          value={this.state.value}
                          onBlur={this.handleOnBlur.bind(this)}
                          onChange={this.onChange.bind(this)}
                           />
                    </form>
                </div>
            );
        }

        return (
            <div className="todo-app__main__todo-list__item__text-container">
                <p
                  className={
                      isCompleted
                      ?"todo-app__main__todo-list__item__text-container__text todo-app__main__todo-list__item__text-container__text_completed"
                      :"todo-app__main__todo-list__item__text-container__text todo-app__main__todo-list__item__text-container__text_incompleted"}
                  >{task}</p>
            </div>
        );
    }
//updating the task's text value
    onChange(event){
      this.setState({ value: event.target.value });
    }
// a fn which deals with rendering only buttons in a task section. there are two versions save/cancel and edit/delete
    renderActionsSection() {
      const { task, isCompleted } = this.props;

        if (this.state.isEditing) {
            return (
                <div className="todo-app__main__todo-list__item__buttons-container">
                    <button
                      className=
                        "todo-app__main__todo-list__item__buttons-container__button
                        todo-app__main__todo-list__item__buttons-container__button__image
                        todo-app__main__todo-list__item__buttons-container__button__image_save"
                      onClick={this.onSaveClick.bind(this)}
                      ></button>
                    <button
                      className=
                        "todo-app__main__todo-list__item__buttons-container__button
                        todo-app__main__todo-list__item__buttons-container__button__image
                        todo-app__main__todo-list__item__buttons-container__button__image_cancel"
                      onClick={this.onCancelClick.bind(this)}
                      ></button>
                    <button
                      className={
                        isCompleted
                        ?"todo-app__main__todo-list__item__buttons-container__button todo-app__main__todo-list__item__buttons-container__button__image             todo-app__main__todo-list__item__buttons-container__button__image_tick_active"
                        :"todo-app__main__todo-list__item__buttons-container__button todo-app__main__todo-list__item__buttons-container__button__image todo-app__main__todo-list__item__buttons-container__button__image_tick"}
                        onClick={this.props.toggleTask.bind(this,task)}
                      ></button>
                </div>
            );
        }

        return (
            <div className="todo-app__main__todo-list__item__buttons-container">
                <button
                  className=
                    "todo-app__main__todo-list__item__buttons-container__button
                    todo-app__main__todo-list__item__buttons-container__button__image
                    todo-app__main__todo-list__item__buttons-container__button__image_edit"
                  onClick={this.onEditClick.bind(this)}
                  ></button>
                <button
                  className=
                    "todo-app__main__todo-list__item__buttons-container__button
                    todo-app__main__todo-list__item__buttons-container__button__image
                    todo-app__main__todo-list__item__buttons-container__button__image_delete"
                    onClick={
                      this.state.isBlockingClick
                      ? this.blockingFn.bind(this)
                      :this.props.deleteTask.bind(this, this.props.task)}
                  ></button>
                <button
                  className={
                    isCompleted
                    ?"todo-app__main__todo-list__item__buttons-container__button todo-app__main__todo-list__item__buttons-container__button__image             todo-app__main__todo-list__item__buttons-container__button__image_tick_active"
                    :"todo-app__main__todo-list__item__buttons-container__button    todo-app__main__todo-list__item__buttons-container__button__image todo-app__main__todo-list__item__buttons-container__button__image_tick"}
                    onClick={this.props.toggleTask.bind(this,task)}
                  ></button>
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

    handleOnBlur(e) {
      e.preventDefault();
      // this.onSaveClick2();
      this.setState({ isEditing: false,isBlockingClick: true,  });
    }
    // blockClickingOnFocus(e){
    //   e.preventDefault();
    //   this.setState({ isBlockingClick: true, });
    // }
  // fn which deals with editing text
    onEditClick(e) {
      e.preventDefault();
      // this.props.dropBlockOnEdit(true);
      this.state.isBlockingClick
      ?this.setState({ isBlockingClick: false, })
      :this.setState({ isEditing: true, });
    }
    // fn which deals with canceling the editing mode
    onCancelClick() {
        // this.setState({ isEditing: false });
        // this.props.dropBlockOnEdit(false);
    }
    // fn which deals with saving the editing mode. The fn triggers fn saveTask() recived in props from todo-app
    onSaveClick(event) {
        event.preventDefault();
        const oldTask = this.props.task;
        const newTask = this.state.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false });
    }
    blockingFn(){
      this.setState({ isBlockingClick: false, })
    }
}




              // onTouchStart={this.props.touchStart.bind(this)}
              // onTouchMove={this.props.touchMove.bind(this)}
              // onTouchEnd={this.props.touchEnd.bind(this)}
