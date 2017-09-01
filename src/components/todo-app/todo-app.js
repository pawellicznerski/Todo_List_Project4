import React,{Component} from 'react';
import CreateTodo from './__todo-form/todo-form.js';
import TodosList from './__todo-list/todo-list.js';
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
            menuActive: false,
            value:"all",
            todos:[],
            selectState:[],
            error:null,
            errortext:'',
            selectionActive:false,
            movedTextId:'',
        };
    }

    render() {
        return (
            <div className="todo-app" >
              <div className="todo-app__content">
                <header className="header">
                  <div className="header__logo">
                    <button
                      className={
                        this.state.menuActive
                        ?"header__logo__menu-button header__logo__menu-button_active"
                        :"header__logo__menu-button" }
                      onClick={this.toggleFilterMenu.bind(this)}>
                    </button>
                    <div className="header__logo__text">
                      <p className="header__logo__text__words">Your todo list</p>
                      <div className="header__logo__text__dots"></div>
                    </div>
                  </div>
                  <div className={
                      this.state.menuActive
                      ?"header__filters header__filters_visible"
                      :'header__filters header__filters_hidden'}>
                    <TodoFinder
                      findTask={this.findTask.bind(this)}
                      renderHeaderError={this.renderHeaderError.bind(this)}
                      menuActive={this.state.menuActive}
                    />
                  <select
                    className={
                      this.state.menuActive
                      ?"header__filters__el header__filters__el__select"
                      :"header__filters__el header__filters__el_hidden header__filters__el__select"
                    }
                    value={this.state.value}
                    onChange={this.handleSelectChange.bind(this)}>
                      <option className="header__filters__el__select__item" value=""></option>
                      <option className="header__filters__el__select__item" value="all">all</option>
                      <option className="header__filters__el__select__item" value="complete">complete</option>
                      <option className="header__filters__el__select__item" value="incomplete">incomplete</option>
                  </select>
                  </div>
                  {this.renderError2()}
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
                    deleteTask={this.deleteTask.bind(this)}
                    dragStart={this.dragStart.bind(this)}
                    dragEnter={this.dragEnter.bind(this)}
                    dragLeave={this.dragLeave.bind(this)}
                    dragOver={this.dragOver}
                    dragDrop={this.dragDrop.bind(this)}
                  />
                </main>
              </div>
            </div>

        );
    }
//--------------------------------------------INITIAL AND UNIVERSAL FUNCTIONS-----------------------------------------------------
    //rendering initial state of todolist from local storage
    componentDidMount(){
      console.log(tasksVar);
      _.remove(tasksVar, todo => todo===null);
      tasksVar? this.setState({todos: tasksVar,selectState: tasksVar,}) : null;
    }
    //saving data in local storage as a string
    updateLocalStorage(todos){
      localStorage.setItem('storedTasks4',JSON.stringify(todos));
    }
    //fn dealing with showing and hiding menu
    toggleFilterMenu(e){
      e.preventDefault();
      this.filterTasks("all");
      this.setState({menuActive: !this.state.menuActive,errortext:'',value:'all'});
    }
    //fn handling change in value in select form
    handleSelectChange(event) {
      event.preventDefault();
         this.setState({value: event.target.value});
         this.filterTasks(event.target.value);
     }
//-------------------------------------------------------------------------END-----------------------------------------------------------------------

//--------------------------------------------------------------------FILTER AND FINDING FUNCTIONS-----------------------------------------------
  //fn filtering tasks
    filterTasks(value){
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
            if(this.state.selectState[i].isCompleted === false){foundSelectTodos.push(this.state.selectState[i])}
          }
          this.setState({todos: foundSelectTodos,selectionActive:true});
        }
      // }//end of blocking filterTask in case menu is closed
    }//end of filterTasks

    //fn finding task's name
    findTask(value){
        const foundTodoArr=[];
        const foundTodo = _.find(this.state.todos, todo => todo.task === value);
        const findErrorValue=foundTodo?"":"No such task in the list";
        foundTodoArr.push(foundTodo);
        this.setState({ todos: foundTodoArr,value:'',errortext: '',error:findErrorValue });
    }
//--------------------------------------------------------------------END----------------------------------------------------------------------

//-------------------------------------------------------------------- DRAG EVENTS-----------------------------------------------------------
    //disabling dragOver to enable dragDrop
    dragOver(e){
      e.preventDefault();
      return false;
    }

    //enabling moving data
    dragStart(event) {
        const movedTextId = event.target.id;
        this.setState({movedTextId:movedTextId})
        event.dataTransfer.dropEffect = "move";
    }
    //hits when you drag over a certian el
    dragEnter(event) {
      event.target.style.backgroundColor = "red";
    }
    //hits when you drag off a certian el
    dragLeave(event) {
      event.target.style.backgroundColor = "white";
    }
    //hits when you drop over a certian el
    //here the code moves data in the array and sends it to local storage
    dragDrop(event) {
      event.preventDefault();
      event.target.style.backgroundColor = "white";
      const foundReplacedTextIndex = _.findIndex(this.state.todos, todo => todo.id == event.target.parentNode.id);

      const foundMovedObject = _.find(this.state.todos, todo => todo.id == this.state.movedTextId);
      _.remove(this.state.todos, todo => todo.id == this.state.movedTextId);
      this.state.todos.splice(foundReplacedTextIndex, 0, foundMovedObject);

      _.remove(this.state.todos , todo => todo===null);
      this.setState({ todos: this.state.todos });
      this.updateLocalStorage(this.state.todos);
    }//end of dropdrag
//-----------------------------------------------------------------END----------------------------------------------------------------------------

//----------------------------------------------------------------ERROR FUNCTIONS----------------------------------------------------------------
    //fn which gets info from search component, if and what render in error spot
    renderHeaderError(text){
      if(!text){ this.setState({ errortext: '',error:'' })}else{this.setState({ errortext: text })}
    }
    //fn which renders info from search component
    renderError2() {
        if (!this.state.errortext) { return null; }
        return <div className="main__todo-creator__error">{this.state.errortext}</div>;
    }
    //function which renders error where the create form is filled incorrectly
    renderError() {
        if (!this.state.error) { return null; }
        return <div className="main__todo-creator__error">{this.state.error}</div>;
    }
    //-----------------------------------------------------------------END----------------------------------------------------------------------------

    //--------------------------------------CREATE,DELETE,SAVE ITEM FUNCTIONS-----------------------------------------------------------

  //function which deels with marking if a certain item on a list is completed or not
    toggleTask(task) {
      this.state.todos=tasksVar;
      const foundTodo = _.find(this.state.todos, todo => todo?todo.task === task:null);
      const sendValueToFilter = foundTodo.isCompleted?"complete":"incomplete";
      foundTodo.isCompleted = !foundTodo.isCompleted;

      this.setState({ todos: this.state.todos });
      this.updateLocalStorage(this.state.todos);
      if(this.state.selectionActive){
        this.filterTasks(sendValueToFilter);
      }
    }
    //function which deels with creating a new element on the list
    createTask(task) {
      this.state.todos=tasksVar;
      const newId = new Date().getTime().toString();
      this.state.todos.unshift({
          task,
          isCompleted: false,
          id: newId,
      });
      this.setState({todos: this.state.todos,selectionActive: false });
      this.handleComingBackAfterChangeState(this.state.todos);
    }
    //function which deels with saving changes in an item
    saveTask(oldTask, newTask) {
        this.state.todos=tasksVar;
        const foundTodo = _.find(this.state.todos, todo => todo?todo.task === oldTask:null);
        foundTodo.task = newTask;
        // _.remove(this.state.todos , todo => todo===null);
        this.setState({ todos: this.state.todos,selectionActive: false,error:"" });
        this.handleComingBackAfterChangeState(this.state.todos);
    }
    //function which deels with removing a task
    deleteTask(taskToDelete) {
        this.state.todos=tasksVar;
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        // _.remove(this.state.todos, todo => todo===null);
        this.setState({ todos: this.state.todos});
        this.handleComingBackAfterChangeState(this.state.todos);
    }
    //fn which supports delete/save/create fns and refilters data if the fn were hit while being segregated
    handleComingBackAfterChangeState(currenState){
      this.updateLocalStorage(currenState);
      if(this.state.value==="complete"){
        this.filterTasks("complete")
      }else if(this.state.value==="incomplete"){
        this.filterTasks("incomplete")
      }
    }
}
//-----------------------------------------------------------------END----------------------------------------------------------------------------
