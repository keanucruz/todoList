import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ task: "", status: "Ongoing" });
  const [filter, setFilter] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3009/api/todos");
    setTodos(response.data);
  };

  const addOrUpdateTodo = async () => {
    if (!newTodo.task) return;

    if (isEditing) {
      await axios.put(`http://localhost:3009/api/todos/${currentId}`, {
        ...newTodo,
      });
      setIsEditing(false);
      setCurrentId(null);
    } else {
      await axios.post("http://localhost:3009/api/todos", newTodo);
    }

    setNewTodo({ task: "", status: "Ongoing" });
    fetchTodos();
  };

  const editTodo = (todo) => {
    setNewTodo(todo);
    setIsEditing(true);
    setCurrentId(todo.id);
  };

  const updateTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    const updatedStatus =
      todoToUpdate.status === "Ongoing" ? "Finished" : "Ongoing";
    await axios.put(`http://localhost:3009/api/todos/${id}`, {
      ...todoToUpdate,
      status: updatedStatus,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3009/api/todos/${id}`);
    fetchTodos();
  };

  const filteredTodos =
    filter === "All" ? todos : todos.filter((todo) => todo.status === filter);

  return (
    <div>
      <h1>TO-DO LIST</h1>
      <input
        type="text"
        value={newTodo.task}
        onChange={(e) => setNewTodo({ ...newTodo, task: e.target.value })}
        placeholder="New task"
      />
      <button onClick={addOrUpdateTodo}>
        {isEditing ? "Update Todo" : "Add Todo"}
      </button>

      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="All">All</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Finished">Finished</option>
      </select>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span>
              {todo.task} - {todo.status}
            </span>
            <button onClick={() => editTodo(todo)}>Edit</button>
            <button onClick={() => updateTodo(todo.id)}>Toggle Status</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
