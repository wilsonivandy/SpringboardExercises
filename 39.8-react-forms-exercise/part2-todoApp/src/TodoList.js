import React, { useState } from "react";
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { v4 as uuid } from "uuid";


function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        let newTodo = { ...todo, id: uuid() };
        setTodos(todos => [...todos, newTodo]);
      };

    const removeTodo = id => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    };

    const renderTodos = () => {
        return (
            <div>
                <h2>Todos:</h2>
                <ul>
                    {todos.map(todo => (
                        <Todo 
                            key={todo.id}
                            id={todo.id}
                            task={todo.task}
                            removeTodo={removeTodo}
                        />
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div>
            <NewTodoForm addTodo={addTodo}/>
            {renderTodos()}
        </div>
    )
}

export default TodoList