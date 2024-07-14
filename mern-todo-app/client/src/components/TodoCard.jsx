import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

import axios from "axios";
import { useState } from "react";

const TodoCard = ({ task, _id, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [editTask, setEditTask] = useState(task);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/v1/todo/${_id}`);
    onDelete(_id);
  };

  const handleEdit = async () => {
    try {
      if (editTask === "") return alert("please enter a task to edit");
      const res = await axios.put(
        `http://localhost:5000/api/v1/todo/edit/${_id}`,
        {
          task: editTask,
        }
      );
      setEditing(false);
      onEdit(_id, editTask);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex justify-between items-center py-3 border-b">
      {editing ? (
        <input
          type="text"
          required
          onChange={(e) => {
            setEditTask(e.target.value);
          }}
          value={editTask}
          className="outline-none px-4 py-2 border border-orange-500"
          placeholder="enter a task"
        />
      ) : (
        <h1 className="font-medium">{task}</h1>
      )}
      <div className="flex justify-center items-center gap-2">
        {editing ? (
          <button
            type="submit"
            className="p-2 bg-orange-500 text-white rounded"
            onClick={handleEdit}
          >
            {/* Check button for editing */}
            <FaCheck />
          </button>
        ) : (
          <>
            <button
              className="p-2 bg-orange-500 text-white rounded"
              onClick={() => {
                setEditing(true);
              }}
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-orange-500 text-white rounded"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
