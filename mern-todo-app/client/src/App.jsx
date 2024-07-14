import TodoCard from "./components/TodoCard";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/todo", {
        task: newTask,
      });
      setNewTask("");
      setTodos([...todos, res.data.todo]);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/todo");

        setTodos(res.data.todos);
      } catch (error) {
        alert(error);
      }
    };

    fetchAllTodos();
  }, []);

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleEditTodo = (id, updatedTask) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, task: updatedTask } : todo
      )
    );
  };

  return (
    <main className="w-full h-screen flex justify-center items-center bg-slate-200">
      <div className="p-5 border bg-white rounded-lg">
        <h1 className="text-2xl font-medium text-center mb-5">
          Todo Application
        </h1>

        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
            value={newTask}
            className="outline-none px-4 border border-orange-500"
            placeholder="enter a task"
          />
          <button
            type="submit"
            className="text-white font-medium bg-orange-500 rounded-e-lg px-4 py-2"
          >
            Add
          </button>
        </form>
        {todos.length != 0 ? (
          <div className="mt-4 flex flex-col">
            {todos.map((todo) => (
              <TodoCard
                key={todo._id}
                task={todo.task}
                _id={todo._id}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
              />
            ))}
          </div>
        ) : (
          <h1 className="text-center mt-4 text-lg italic text-orange-500">
            no todos found
          </h1>
        )}
      </div>
    </main>
  );
};

export default App;
