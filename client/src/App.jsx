import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [todo, setTodo] = useState(""); // String state for new task input

  const apiUrl = "http://localhost:3000"; // Adjust to match your backend URL

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getTodo`);
      setTasks(response.data.todos); // Update tasks state
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!todo.trim()) {
      alert("Task cannot be empty");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/addTodo`, { todo });
      console.log(response.data.message); // Log success message
      setTodo(""); // Clear input field
      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task
  // const deleteTask = async (id) => {
  //   try {
  //     const response = await axios.delete(`${apiUrl}/deleteTodo/${id}`);
  //     console.log(response.data.message); // Log success message
  //     fetchTasks(); // Refresh tasks
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <h1>To-Do App</h1>
      <div className="input-container">
        <input
          type="text"
          name="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <h6>{task.todo}</h6>
            {/* <button onClick={() => deleteTask(task.id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
