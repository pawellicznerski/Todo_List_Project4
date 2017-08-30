import React,{Component} from 'react';
import CreateTodo from './__todo-form/todo-form.js';
import TodosList from './__todo-list/todo-list.js';
import TodoFilter from './__todo-filter/todo-filter.js';
import TodoFinder from './__todo-finder/todo-finder.js';
import _ from "lodash";

//creating an array in which local storage will be put
var tasksVar = [];
//creating const in which a string from localStorage will be kept
const tasksVarLocalStorage = localStorage.getItem('storedTasks4');
//changing the string into proper value and putting it into the array
tasksVar=JSON.parse(tasksVarLocalStorage);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value:"all",
            todos:[],
            selectState:[],
            error:null,
            selectionActive:false,
            movedTextId:'',
            menuActive: true,
            errortext:''
        };
    }

    render() {
        return (
            <div>
                <header className="header">
                  <div className="header__logo"><button className="header__logo__menu-button" onClick={this.toggleFilterMenu.bind(this)}></button><p className="header__logo__text">Your todo list...</p></div>
                  <div className={this.state.menuActive?"header__filters header__filters_visible":'header__filters header__filters_hidden'}>
                    <TodoFinder
                      findTask={this.findTask.bind(this)}
                      renderHeaderError={this.renderHeaderError.bind(this)}
                    />
                    <select className="header__filters__el header__filters__el__select" value={this.state.value} onChange={this.handleSelectChange.bind(this)}>
                      <option className="header__filters__el__select__item" value=""></option>
                      <option className="header__filters__el__select__item" value="all">all</option>
                      <option className="header__filters__el__select__item" value="complete">complete</option>
                      <option className="header__filters__el__select__item" value="incomplete">incomplete</option>
                    </select>
                  </div>
                  {this.renderHeaderError()}
                </header>
                <main className="main">
                  <CreateTodo
                    todos={this.state.todos}
                    createTask={this.createTask.bind(this)}
                  />
                  {this.renderError()}
                  <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    dropBlockOnEdit={this.dropBlockOnEdit.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                    dragStart={this.dragStart.bind(this)}
                    dragEnd={this.dragEnd.bind(this)}
                    dragEnter={this.dragEnter.bind(this)}
                    dragLeave={this.dragLeave.bind(this)}
                    dragOver={this.dragOver}
                    dragDrop={this.dragDrop.bind(this)}
                  />
                </main>
            </div>

        );
    }
    toggleFilterMenu(e){
      e.preventDefault();
      this.setState({
        menuActive: !this.state.menuActive

      });
    }

    handleSelectChange(event) {
      event.preventDefault();
       this.setState({value: event.target.value});
       this.filterTasks(event.target.value);
     }
  //fn filtering tasks
    filterTasks(value){
      // console.log('value:',value);
      // console.log('tasksVar:',tasksVar);
      _.remove(tasksVar, todo => todo===null);
      this.setState({selectState: tasksVar,});
      if(value==="all"){
        this.setState({todos: tasksVar,selectionActive:false})
      } else if (value==="complete"){
        const foundSelectTodos =[];
        for (var i = 0; i < this.state.selectState.length; i++) {
          if(this.state.selectState[i].isCompleted === true){
            foundSelectTodos.push(this.state.selectState[i])
          }
        }
        this.setState({todos: foundSelectTodos,selectionActive:true});
      } else if (value==="incomplete"){
        let foundSelectTodos =[];
        for (var i = 0; i < this.state.selectState.length; i++) {
          if(this.state.selectState[i].isCompleted === false){
            foundSelectTodos.push(this.state.selectState[i])
          }
        }
        this.setState({todos: foundSelectTodos,selectionActive:true});
      }
    }

    //fn finding task's name
    findTask(value){
      const foundTodoArr=[];
      const foundTodo = _.find(this.state.todos, todo => todo?todo.task === value:null);
      foundTodoArr.push(foundTodo);
      this.setState({ todos: foundTodoArr,value:'' });
    }

    //rendering initial state of todolist from local storage
    componentDidMount(){
      console.log(tasksVar);
      _.remove(tasksVar, todo => todo===null);
      tasksVar? this.setState({todos: tasksVar,selectState: tasksVar,}) : null;
    //   console.log(this.state.todos);
    }

    //saving data in local storage as a string
    updateLocalStorage(todos){
      localStorage.setItem('storedTasks4',JSON.stringify(todos));
    }

    //disabling dragOver to enable dragDrop
    dragOver(e){
      e.preventDefault();
      return false;
    }

    //enabling moving data
    dragStart(event) {
      // console.log("dragStart:",this.state.selectionActive);
      if(!this.state.selectionActive){
        // event.dataTransfer.setData("text", event.target.getAttribute('id') );
        const movedTextId = event.target.id;
        this.setState({movedTextId:movedTextId})
        console.log("movedTextId:",movedTextId);
        event.dataTransfer.dropEffect = "move";
        // console.log( "DragStart id:",event.target.getAttribute('id'));
      } else{
        event.preventDefault();
      }
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

      const foundReplacedTextIndex = _.findIndex(this.state.todos, todo => todo.id == event.target.parentNode.id);
      console.log("foundReplacedTextIndex:",foundReplacedTextIndex);

      const foundMovedObject = _.find(this.state.todos, todo => todo.id == this.state.movedTextId);
      // console.log("foundMovedObject:",foundMovedObject);
      _.remove(this.state.todos, todo => todo.id == this.state.movedTextId);
      this.state.todos.splice(foundReplacedTextIndex, 0, foundMovedObject);
      // console.log("4:",this.state.todos);
      _.remove(this.state.todos , todo => todo===null);
      this.setState({ todos: this.state.todos });
      this.updateLocalStorage(this.state.todos);
    }
    //i do not need it at the moment, but meybe :)
    dragEnd(event) {
      console.log( "DragEnd id:",event.target.getAttribute('id'));
    }
    //function which deels with marking if a certain item on a list is completed or not
    toggleTask(task) {
      this.state.todos=tasksVar;
      const foundTodo = _.find(this.state.todos, todo => todo?todo.task === task:null);
      const sendValueToFilter = foundTodo.isCompleted?"complete":"incomplete";
      console.log(sendValueToFilter);
      foundTodo.isCompleted = !foundTodo.isCompleted;
      // _.remove(this.state.todos , todo => todo===null);
      this.setState({ todos: this.state.todos });
      this.updateLocalStorage(this.state.todos);
      if(this.state.selectionActive){
        this.filterTasks(sendValueToFilter);
      }
    }

    renderHeaderError(text){
      console.log("wywołana renderHeaderError:",text);
      if (!text) { console.log("if renderHeaderError: Bład",);return null; }else{
        console.log("if renderHeaderError: ok",);
        this.setState({ errortext: text });
        return <div className="main__todo-creator__error">{this.state.errortext}</div>;
      }
    }
    //function which renders error where the form is filled incorrectly
    renderError() {
        if (!this.state.error) { return null; }
        return <div className="main__todo-creator__error">{this.state.error}</div>;
    }
    //function which deels with creating a new element on the list
    createTask(task) {
      if(!this.state.selectionActive){
      // this.setState({selectState: tasksVar,});
      this.state.todos=tasksVar;
      //settles unique id nomber
      const newId = new Date().getTime().toString();
      // console.log("newId:",newId);
      this.state.todos.unshift({
          task,
          isCompleted: false,
          id: newId,
      });
      // _.remove(this.state.todos , todo => todo===null);
      this.setState({todos: this.state.todos,value:'all',selectionActive: false });
        // console.log('all',this.state.value);
      this.updateLocalStorage(this.state.todos);
      // console.log("1:",this.state.todos);
      } else {
        this.setState({todos: this.state.todos,value:'all',selectionActive: false,error:"Complete editing item"});
      }
    }
    dropBlockOnEdit(value,value2){
      this.setState({ selectionActive: value });
    }
    //function which deels with saving changes to the already existing element
    saveTask(oldTask, newTask) {
        this.state.todos=tasksVar;
        const foundTodo = _.find(this.state.todos, todo => todo?todo.task === oldTask:null);
        foundTodo.task = newTask;
        // _.remove(this.state.todos , todo => todo===null);
        this.setState({ todos: this.state.todos,selectionActive: false,error:"" });
        this.updateLocalStorage(this.state.todos);
    }
    //function which deels with removing a task
    deleteTask(taskToDelete) {
        this.state.todos=tasksVar;
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        // _.remove(this.state.todos, todo => todo===null);
        this.setState({ todos: this.state.todos});
        this.updateLocalStorage(this.state.todos);
    }
}
