import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Task.css";

export function TaskDATA() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [categories, setCategories] = useState({
    completed: [],
    ongoing: [],
    notStarted: [],
  });
  const [hoveredTask, setHoveredTask] = useState(null);

  // Fetch tasks from the Realtime Database
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://taskmanagement-5e484-default-rtdb.firebaseio.com/TasksDatas.json`
        );
        if (response.data) {
          const tasksArray = Object.keys(response.data).map((id) => ({
            id,
            ...response.data[id],
          }));
          setTasks(tasksArray);
          categorizeTasks(tasksArray);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (taskName.trim()) {
      try {
        const newTask = { name: taskName, status: "notStarted" };
        const response = await axios.post(
          `https://taskmanagement-5e484-default-rtdb.firebaseio.com/TasksDatas.json`,
          newTask
        );
        const updatedTask = { id: response.data.name, ...newTask }; // Get generated ID
        setTaskName(""); // Clear input
        const updatedTasks = [...tasks, updatedTask];
        setTasks(updatedTasks);
        categorizeTasks(updatedTasks);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const editTask = async (id, newName) => {
    try {
      const task = tasks.find((task) => task.id === id);
      const updatedTask = { ...task, name: newName };
      await axios.put(
        `https://taskmanagement-5e484-default-rtdb.firebaseio.com/TasksDatas/${id}.json`,
        updatedTask
      );
      const updatedTasks = tasks.map((task) =>
        task.id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
      categorizeTasks(updatedTasks);
      setEditingTask(null);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://taskmanagement-5e484-default-rtdb.firebaseio.com/TasksDatas/${id}.json`
      );
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      categorizeTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const task = tasks.find((task) => task.id === id);
      const updatedTask = { ...task, status: newStatus };
      await axios.put(
        `https://taskmanagement-5e484-default-rtdb.firebaseio.com/TasksDatas/${id}.json`,
        updatedTask
      );
      const updatedTasks = tasks.map((task) =>
        task.id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
      categorizeTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const categorizeTasks = (tasks) => {
    const completed = tasks.filter((task) => task.status === "completed");
    const ongoing = tasks.filter((task) => task.status === "ongoing");
    const notStarted = tasks.filter((task) => task.status === "notStarted");
    setCategories({ completed, ongoing, notStarted });
  };

  // Handle hover for task tooltip
  const handleHover = (id) => {
    // Find the task with the given id
    const currentTask = tasks.find((task) => task.id === id);

    if (!currentTask) return "Task not found";

    // Find tasks with the same status as the current task
    const taskList = tasks
      .filter((task) => task.status === currentTask.status) // Match tasks with the same status
      .map((task) => task.name) // Extract task names
      .join(", "); // Combine names into a single string

    return taskList || "No tasks available";
  };
  return (
    <div className="App">
      <header>
        <nav>
          <span>Completed: {categories.completed.length}</span>
          <span>Ongoing: {categories.ongoing.length}</span>
          <span>Not Started: {categories.notStarted.length}</span>
        </nav>
      </header>

      <div>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            onMouseEnter={() => setHoveredTask(task.id)}
            onMouseLeave={() => setHoveredTask(null)}
            className="task-card"
          >
            {editingTask === task.id ? (
              <input style={{width:"195px"}}
                defaultValue={task.name}
                onBlur={(e) => editTask(task.id, e.target.value)}
              />
            ) : (
              <span>{task.name}</span>
            )}
            <button onClick={() => setEditingTask(task.id)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <div>
              <button
                style={{
                  backgroundColor: task.status === "completed" ? "Green" : "",
                  border: task.status === "completed" ? "2px solid black" : "",
                }}
                onClick={() => updateStatus(task.id, "completed")}
              >
                Mark as Completed
              </button>
              <button
                style={{
                  backgroundColor: task.status === "ongoing" ? "Green" : "",
                  border: task.status === "ongoing" ? "2px solid black" : "",
                }}
                onClick={() => updateStatus(task.id, "ongoing")}
              >
                Mark as Ongoing
              </button>
              <button
                style={{
                  backgroundColor: task.status === "notStarted" ? "green" : "",
                  border: task.status === "notStarted" ? "2px solid black" : "",
                }}
                onClick={() => updateStatus(task.id, "notStarted")}
              >
                Mark as Not Started
              </button>
            </div>

            {hoveredTask === task.id && (
              <div className="task-tooltip">
                Related Tasks: {handleHover(task.id)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskDATA;
