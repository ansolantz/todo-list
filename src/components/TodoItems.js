import React, { Component } from "react";

class TodoItems extends Component {


  render() {
    return (
      <div className="theList">
        {
          this.props.listOfTodos.map((todoItem) => {
            return (
              <div className="listItem" key={todoItem._id}>
                {!todoItem.isEditing &&
                  <div>
                    <h2>{todoItem.title}</h2>
                    <p className="todoBody">{todoItem.body}</p>
                    <button type="submit" onClick={() => { todoItem.isEditing = true; this.forceUpdate(); }}>Edit</button>
                    <button type="submit" onClick={() => this.props.deleteTodo(todoItem._id)}>Delete</button>
                  </div>
                }
                {todoItem.isEditing &&
                  <form onSubmit={(event) => this.props.updateTodo(event, todoItem)}>
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