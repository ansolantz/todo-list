import React, { Component } from 'react';
import axios from 'axios';
import TodoItems from "./TodoItems";
import "./TodoList.css";
import FlipMove from "react-flip-move";


class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfTodos: [],
      title: '',
      body: '',
      errorMessage: '',
    };

  }

  addTodo = (event) => {
    event.preventDefault();
    const { title, body } = this.state;

    if (title !== '' && body !== '') {
      axios.post("http://localhost:4000/api/v1/todos", { title, body })
        .then(() => {
          //this.props.getData();
          this.getAllTodos()
          this.setState({ title: '', body: '' });
        })
        .catch((err) => console.log(err))
      this.setState({ title: '', body: '', errorMessage: '' });
    } else {
      this.setState({ errorMessage: 'Please enter a title and a description for your todo!' });
    }
  }

  getAllTodos = () => {
    axios.get(`http://localhost:4000/api/v1/todos`)
      .then((apiResponse) => {
        const myListOfTodos = apiResponse.data.map((todo) => {
          return { ...todo, isEditing: false }
        }).reverse()

        this.setState({ listOfTodos: myListOfTodos })
        //console.log("ListofTodos: ", apiResponse.data)
      })
  }

  deleteTodo = (id) => {
    //const { id } = this.props.match.params;
    console.log("id: ", id)
    axios.delete(`http://localhost:4000/api/v1/todos/${id}`)
      .then(() => this.getAllTodos())
      .catch((err) => console.log(err));
  }

  updateTodo = (event, todoItem) => {
    event.preventDefault();
    //console.log("todoItem. ", todoItem)

    const { _id, title, body } = todoItem;

    axios.put(`http://localhost:4000/api/v1/todos/${_id}`, { title, body })
      .then(() => this.getAllTodos())
      .catch((err) => console.log(err))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  componentDidMount() {
    //  fetching the data from API befor initial render
    this.getAllTodos()
  }


  render() {
    return (
      <div className="todoListMain">
        <div className="formContainer">
          <h1>Todo List</h1>
          <form onSubmit={this.addTodo} method="POST">

            <label>Title:</label>
            <input type="text"
              name="title"
              value={this.state.title}
              onChange={(e) => this.handleChange(e)} />

            <label>Task to do:</label>
            <textarea type="text"
              name="body"
              value={this.state.body}
              onChange={(e) => this.handleChange(e)} />


            <button type="submit">Add task</button>

          </form>
          <span className="error">{this.state.errorMessage}<br /></span>
        </div>
        <FlipMove duration={250} easing="ease-out">
          <div className="todosContainer">
            <TodoItems listOfTodos={this.state.listOfTodos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo} />
          </div>
        </FlipMove>

      </div>
    );
  }
}

export default TodoList;


