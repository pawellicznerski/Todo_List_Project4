import React,{Component} from 'react';
import CreateTodo from './__todo-form/todo-form.js';
import TodosList from './__todo-list/todo-list.js';
import TodoFilter from './__todo-filter/todo-filter.js';
import TodoFinder from './__todo-finder/todo-finder.js';
import _ from "lodash";

//creating an array in which local storage will be put
var tasksVar = [];
//creating const in which a string from localStorage will be kept
const tasksVarLocalStorage = localStorage.getItem('storedTasks');
//changing the string into proper value and putting it into the array
tasksVar=JSON.parse(tasksVarLocalStorage);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos:[],
            droppedIn: false,
            order:1,
            selectState:[]
        };
    }

    render() {
        return (
            <div>
                <h1>React ToDos App</h1>
                <TodoFilter filterTasks={this.filterTasks.bind(this)}></TodoFilter>
                <TodoFinder findTask={this.findTask.bind(this)}></TodoFinder>
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
                />
            </div>
        );
    }

  //fn filtering tasks
    filterTasks(value){
      console.log('value:',value);
      this.setState({selectState: tasksVar,});
      if(value==="all"){
        this.setState({todos: tasksVar,})
      } else if (value==="complete"){
        const foundSelectTodos =[];
        for (var i = 0; i < this.state.selectState.length; i++) {
          if(this.state.selectState[i].isCompleted === true){
            foundSelectTodos.push(this.state.selectState[i])
          }
        }
        this.setState({ todos: foundSelectTodos });
      } else if (value==="incomplete"){
        let foundSelectTodos =[];
        for (var i = 0; i < this.state.selectState.length; i++) {
          if(this.state.selectState[i].isCompleted === false){
            foundSelectTodos.push(this.state.selectState[i])
          }
        }
        this.setState({ todos: foundSelectTodos });
      }
    }
    //fn filtering tasks
    findTask(value){
      const emptyArr=[];
      const foundTodo = _.find(this.state.todos, todo => todo.task === value);
      emptyArr.push(foundTodo);
      this.setState({ todos: emptyArr });
    }

    //rendering initial state of todolist from local storage
    componentDidMount(){
      console.log(tasksVar);
      this.setState({
        todos: tasksVar,
        selectState: tasksVar,
      });
    //   console.log(this.state.todos);
    }
    //saving data in local storage as a string
    updateLocalStorage(todos){
      localStorage.setItem('storedTasks',JSON.stringify(todos));
    }
    //disabling dragOver to enable dragDrop
    dragOver(e){
      e.preventDefault();
      return false;
    }
    //enabling moving data
    dragStart(event) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("text", event.target.getAttribute('id') );
      console.log( "DragStart id:",event.target.getAttribute('id'));
    }
    //hits when you drag over a certian el
    dragEnter(event) {
      console.log( "Enter id:",event.target.parentNode.id);
      event.target.style.backgroundColor = "red";
    }
    //hits when you drag off a certian el
    dragLeave(event) {
      console.log( "Leave id:",event.target.parentNode.id);
      event.target.style.backgroundColor = "lightGrey";
    }
    //hits when you drop over a certian el
    //here the code moves data in the array and sends it to local storage
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
      this.updateLocalStorage(this.state.todos);
    }
    //i do not need it at the moment, but meybe :)
    dragEnd(event) {
      console.log( "DragEnd id:",event.target.getAttribute('id'));
    }
    //function which deels with marking if a certain item on a list is completed or not
    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
        this.updateLocalStorage(this.state.todos);
    }
    //function which deels with creating a new element on the list
    createTask(task) {
        const newId = this.state.todos.length;
        // console.log(arrLength);
        console.log(newId);
        this.state.todos.unshift({
            task,
            isCompleted: false,
            id: newId,

        });
        this.setState({ todos: this.state.todos });
        this.updateLocalStorage(this.state.todos);
    }
    //function which deels with saving changes to the already existing element
    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({ todos: this.state.todos });
        this.updateLocalStorage(this.state.todos);
    }
    //function which deels with removing a task
    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
        this.updateLocalStorage(this.state.todos);
    }
}
