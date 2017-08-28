import React,{Component} from 'react';
import CreateTodo from './__todo-form/todo-form.js';
import TodosList from './__todo-list/todo-list.js';
import _ from "lodash";


const todos = [
{
    task: 'make React tutorial',
    isCompleted: false,
    id:1
},
{
    task: 'eat dinner',
    isCompleted: true,
    id:0
}
];

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos,
            droppedIn: false,
            order:1,
        };
    }

    render() {
        return (
            <div>
                <h1>React ToDos App</h1>
                <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}

                    dragStart={this.dragStart.bind(this)}
                    dragEnd={this.dragEnd.bind(this)}

                    dragEnter={this.dragEnter.bind(this)}
                    dragLeave={this.dragLeave.bind(this)}
                    dragOver={this.dragOver}
                    dragDrop={this.dragDrop.bind(this)}

                    touchStart={this.onTouchStart.bind(this)}
                    touchMove={this.onTouchMove.bind(this)}
                    touchEnd={this.onTouchEnd.bind(this)}
                />
            </div>
        );
    }

      dragOver(e){
        e.preventDefault();
        return false;
      }

    dragStart(event) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("text", event.target.getAttribute('id') );
      console.log( "DragStart id:",event.target.getAttribute('id'));
    }
    resetZ(){
      const elements = document.querySelectorAll('li')
      for (var i = elements.lenght-1; i>=0; i--){
        elements[i].style.zIndex=5;
      }
    }
    onTouchStart(e){
      e.preventDefault();
      const whichArt = e.target;
      const touch = e.touches[0];
      console.log(touch);
      const moveOffsetX = whichArt.offsetLeft - touch.pageX;
      const moveOffsetY = whichArt.offsetTop - touch.pageY;
      this.resetZ();
      whichArt.style.zIndex= 10;
      whichArt.addEventListener("touchmove", function(){
        const positionX = touch.pageX + moveOffsetX;
        const positionY = touch.pageY + moveOffsetY;
        whichArt.style.left = positionX + "px";
        whichArt.style.top = positionY + "px";
      },false)
      // event.dataTransfer.dropEffect = "move";
      // event.dataTransfer.setData("text", event.target.getAttribute('id') );
      // console.log( "DragStart id:",event.target.getAttribute('id'));
    }
    dragEnter(event) {
      console.log( "Enter id:",event.target.parentNode.id);
      event.target.style.backgroundColor = "red";

    }
    dragLeave(event) {
      console.log( "Leave id:",event.target.parentNode.id);
        event.target.style.backgroundColor = "lightGrey";
    }
    onTouchMove(e){
      // e.preventDefault();
      // const whichArt = e.target;
      // const touch = e.touches[0];
      // console.log(touch);
      // const moveOffsetX = whichArt.offsetLeft - touch.pageX;
      // const moveOffsetY = whichArt.offsetTop - touch.pageY;
      // this.resetZ();
      // whichArt.style.zIndex= 10;
      // const positionX = touch.pageX + moveOffsetX;
      // const positionY = touch.pageY + moveOffsetY;
      // whichArt.style.left = positionX + "px";
      // whichArt.style.top = positionY + "px";
    }

    dragDrop(event) {
      event.preventDefault();
      event.target.style.backgroundColor = "lightGrey";

      const movedTextId = event.dataTransfer.getData("text");
      console.log("movedTextId:",movedTextId);
      const replacedTextId = event.target.parentNode.id;
      console.log("replacedTextId:",replacedTextId);


      const foundReplacedTextIndex = _.findIndex(this.state.todos, todo => todo.id == replacedTextId);
      console.log("foundReplacedTextIndex:",foundReplacedTextIndex);
      // console.log(this.state.todos[0].id);
      // console.log(replacedTextId);
      const foundMovedTextIndex = _.findIndex(this.state.todos, todo => todo.id == movedTextId);
      console.log("foundReplacedTextIndex:",foundReplacedTextIndex);

      const foundMovedObject = _.find(this.state.todos, todo => todo.id == movedTextId);
      console.log("foundMovedObject:",foundMovedObject);

      _.remove(this.state.todos, todo => todo.id == movedTextId);
      this.state.todos.splice(foundReplacedTextIndex, 0, foundMovedObject);

      // this.state.todos.splice(movedTextId, 1);
      this.setState({ todos: this.state.todos });

      // fruits.splice(2, 0, "Lemon", "Kiwi");

      // console.log( "Drop id:",event.target.parentNode.id);
      // var elem_id = event.dataTransfer.getData("text2");
      // console.log("setdata:",elem_id);
      //
      // foundTodo.task = newTask;
      // this.setState({ todos: this.state.todos });
      //
      // _.remove(this.state.todos, todo => todo.task === taskToDelete);
      // this.setState({ todos: this.state.todos });
    }
    dragEnd(event) {
      console.log( "DragEnd id:",event.target.getAttribute('id'));
    }

    onTouchEnd(event){
      // event.preventDefault();
      // event.target.style.backgroundColor = "lightGrey";
      //
      // const movedTextId = event.dataTransfer.getData("text");
      // console.log("movedTextId:",movedTextId);
      // const replacedTextId = event.target.parentNode.id;
      // console.log("replacedTextId:",replacedTextId);
      //
      //
      // const foundReplacedTextIndex = _.findIndex(this.state.todos, todo => todo.id == replacedTextId);
      // console.log("foundReplacedTextIndex:",foundReplacedTextIndex);
      // // console.log(this.state.todos[0].id);
      // // console.log(replacedTextId);
      // const foundMovedTextIndex = _.findIndex(this.state.todos, todo => todo.id == movedTextId);
      // console.log("foundReplacedTextIndex:",foundReplacedTextIndex);
      //
      // const foundMovedObject = _.find(this.state.todos, todo => todo.id == movedTextId);
      // console.log("foundMovedObject:",foundMovedObject);
      //
      // _.remove(this.state.todos, todo => todo.id == movedTextId);
      // this.state.todos.splice(foundReplacedTextIndex, 0, foundMovedObject);
      //
      // // this.state.todos.splice(movedTextId, 1);
      // this.setState({ todos: this.state.todos });
    }









    componentDidMount(){
      const arrLength = this.state.todos.length;
      console.log(arrLength);
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
    }

    createTask(task) {
        const newId = this.state.todos.length;
        // console.log(arrLength);
        this.state.todos.unshift({
            task,
            isCompleted: false,
            id: newId,

        });
        this.setState({ todos: this.state.todos });
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({ todos: this.state.todos });
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
    }
}
