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

    renderTaskSection() {
      const { task, isCompleted } = this.props;
        if (this.state.isEditing) {
            return (
                <div className="todo-app__main__list__item__text-container">
                    <form
                      className="todo-app__main__list__item__text-container__form"
                      onSubmit={this.onSaveClick.bind(this)}>
                        <input
                          autoFocus
                          className="todo-app__main__list__item__text-container__form__input"
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
            <div className="todo-app__main__list__item__text-container">
                <p
                  className={
                      isCompleted
                      ?"todo-app__main__list__item__text-container__text todo-app__main__list__item__text-container__text_completed"
                      :"todo-app__main__list__item__text-container__text todo-app__main__list__item__text-container__text_incompleted"}
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
                <div className="todo-app__main__list__item__buttons-container">
                    <button
                      className=
                        "todo-app__main__list__item__buttons-container__button
                        todo-app__main__list__item__buttons-container__button__image
                        todo-app__main__list__item__buttons-container__button__image_save"
                      ></button>
                    <button
                      className=
                        "todo-app__main__list__item__buttons-container__button
                        todo-app__main__list__item__buttons-container__button__image
                        todo-app__main__list__item__buttons-container__button__image_cancel"
                      ></button>
                    <button
                      className={
                        isCompleted
                        ?"todo-app__main__list__item__buttons-container__button todo-app__main__list__item__buttons-container__button__image             todo-app__main__list__item__buttons-container__button__image_tick_active"
                        :"todo-app__main__list__item__buttons-container__button todo-app__main__list__item__buttons-container__button__image todo-app__main__list__item__buttons-container__button__image_tick"}
                        onClick={this.props.toggleTask.bind(this,task)}
                      ></button>
                </div>
            );
        }

        return (
            <div className="todo-app__main__list__item__buttons-container">
                <button
                  className=
                    "todo-app__main__list__item__buttons-container__button
                    todo-app__main__list__item__buttons-container__button__image
                    todo-app__main__list__item__buttons-container__button__image_edit"
                  onClick={this.onEditClick.bind(this)}
                  ></button>
                <button
                  className=
                    "todo-app__main__list__item__buttons-container__button
                    todo-app__main__list__item__buttons-container__button__image
                    todo-app__main__list__item__buttons-container__button__image_delete"
                    onClick={
                      this.state.isBlockingClick
                      ? this.blockingFn.bind(this)
                      :this.props.deleteTask.bind(this, this.props.task)}
                  ></button>
                <button
                  className={
                    isCompleted
                    ?"todo-app__main__list__item__buttons-container__button todo-app__main__list__item__buttons-container__button__image             todo-app__main__list__item__buttons-container__button__image_tick_active"
                    :"todo-app__main__list__item__buttons-container__button    todo-app__main__list__item__buttons-container__button__image todo-app__main__list__item__buttons-container__button__image_tick"}
                    onClick={this.props.toggleTask.bind(this,task)}
                  ></button>
            </div>
        );
    }
    render() {
        return (
            <li
              className="todo-app__main__list__item"
              id={this.props.id}
              draggable="true"
              onDragStart={this.props.dragStart.bind(this)}
              >
              <div
                className="todo-app__main__list__item__drag-point"
                onDragEnter={this.props.dragEnter.bind(this)}
                onDrop={this.props.dragDrop.bind(this)}
                onDragOver={this.props.dragOver.bind(this)}
                onDragLeave={this.props.dragLeave.bind(this)}
                ></div>
                {this.renderTaskSection()}
                {this.renderActionsSection()}
            </li>
        );
    }
// function used to solve the problem of cliking in different plave while editing item
    handleOnBlur(e) {
      e.preventDefault();
      this.setState({ isEditing: false,isBlockingClick: true,  });
    }
// fn to edit item text
    onEditClick(e) {
      e.preventDefault();
      if(this.state.isBlockingClick){
      this.onSaveClick();
      this.setState({ isBlockingClick: false, })
    } else {
      this.setState({ isEditing: true, });
    }
  }
    // fn which deals with saving the editing mode. The fn triggers fn saveTask() recived in props from todo-app
    onSaveClick() {
        const oldTask = this.props.task;
        const newTask = this.state.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false });
    }
    //fn which which is hit instead of edit fn
    blockingFn(){
      this.setState({ isBlockingClick: false, })
    }
}
// IN CAse I Need it
              // onTouchStart={this.props.touchStart.bind(this)}
              // onTouchMove={this.props.touchMove.bind(this)}
              // onTouchEnd={this.props.touchEnd.bind(this)}
