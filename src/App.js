import React from 'react';
import logo from './logo.svg';
import './App.css';

const todoarray = [
  {name: "Buy Groceries", isChecked: false, id: "1"},
  {name: "Play videogames", isChecked: false, id: "2"},
  {name: "Check homework", isChecked: false, id: "3"},
  {name: "Laugh at memes", isChecked: false, id: "4"}
];

function App() {
  return (
    <div className="App">
      <ToDoList content={todoarray}/>
    </div>
  );
}

class ToDoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {content: this.props.content,
                  inputValue: "",
                  done: []};
    this.addToDo = this.addToDo.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  addToDo(contentName, contentId){
    const currentContent = this.state.content;
    currentContent.push({
        name: contentName,
        isChecked : false,
        id : contentId
      })
    this.setState(state => (
      {content: currentContent}
    ))
  }
    
  handleDelete(cid){
    const currentContent = this.state.content;
    this.setState({content: currentContent.filter(content=>content.id != cid)});
  }

  valueChange(event){
    this.setState({inputValue: event.target.value})
  }

  handleClick(cname){
    const currentDone = this.state.done;
    currentDone.push(cname);
    this.setState({done: currentDone});
  }

  render(){
    const todocontent = this.state.content;
    var randomIdNum = Math.floor(Math.random() * 1000);
    var randomId = randomIdNum.toString();
    const doneList = this.state.done;
    return (
      <div className="ToDoList">
        <div className="InputTab">
          Add todo
          <input type="text" value={this.state.inputValue} onChange={this.valueChange}/>
          <button onClick={(contentName,contentId)=>this.addToDo(this.state.inputValue , randomId)}>Add</button>          
        </div>
        <ul>
          {todocontent.map((todo)=> 
            <ToDo 
              name={todo.name} 
              key={todo.id} 
              id={todo.id} 
              onDeletion={this.handleDelete} 
              onClicked={this.handleClick}/>
            )}
        </ul>
        <div className="doneList">Done List:
          <ul>
            {doneList.map((doneItem)=>
              <li>{doneItem}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

class ToDo extends React.Component {
  constructor(props){
    super(props);
    this.handleOnDeletion = this.handleOnDeletion.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnDeletion(e){
    this.props.onDeletion(e);
  }

  handleOnClick(e){
    this.props.onClicked(e);
  }
  
  render(){
    return(
        <li className="Todo">
          <input type="checkbox" onClick={(name)=>this.handleOnClick(this.props.name)}/>
          {this.props.name}
          <button onClick={(id)=>this.handleOnDeletion(this.props.id)}>X</button>
        </li>
    );
  }
}

export default App;
