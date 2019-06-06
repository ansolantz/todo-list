import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import FlipMove from "react-flip-move";

class TodoItems extends Component {
  render() {
    return (
      <div className="theList">
        {
          this.props.listOfTodos.map((todoItem) => {
            return (
              <div className="listItem" key={todoItem._id}>
                <FlipMove duration={250} easing="ease-out">
                  {!todoItem.isEditing &&
                    <div>
                      <span className="buttonContainer">
                        <h2>{todoItem.title}</h2>
                        <FontAwesomeIcon className="closeButton" icon={faTimesCircle}
                          onClick={() => this.props.deleteTodo(todoItem._id)} />
                      </span>
                      <p className="todoBody">{todoItem.body}</p>
                      <button type="button" onClick={() => { todoItem.isEditing = true; this.forceUpdate(); }}>Edit</button>
                      {/* <button type="button" onClick={() => this.props.deleteTodo(todoItem._id)}>Delete</button> */}
                    </div>
                  }
                  {todoItem.isEditing &&
                    <form onSubmit={(event) => this.props.updateTodo(event, todoItem)} method="POST">
                      <label>Title:</label>
                      <input type="text"
                        name="title"
                        value={todoItem.title}
                        onChange={(e) => { todoItem.title = e.target.value; this.forceUpdate() }} />
                      <label>Task to do:</label>
                      <textarea type="text"
                        name="body"
                        value={todoItem.body}
                        onChange={(e) => { todoItem.body = e.target.value; this.forceUpdate() }} />
                      <button type="submit">Update task</button>
                    </form>
                  }
                </FlipMove>
              </div>

            )
          }
          )
        }
      </div>
    )
  }
};

export default TodoItems;