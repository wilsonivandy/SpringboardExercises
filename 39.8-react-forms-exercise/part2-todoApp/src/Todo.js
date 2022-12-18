import React from "react";

function Todo({
    id,
    removeTodo,
    task = "Example Task",
  }) {
    const remove = () => removeTodo(id);
    return (
      <div>
        <li>
            <p>{task}</p>
            <button onClick={remove}>X</button>
        </li>
      </div>
    );
  }
  
  export default Todo;