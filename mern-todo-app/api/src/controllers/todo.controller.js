const Todo = require("../models/todo");

const todoController = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).json({ todos: todos });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  createdTodo: async (req, res) => {
    try {
      const { task } = req.body;
      const todo = await Todo.create({
        task: task,
      });
      res.status(201).json({ message: "Todo created", todo: todo });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findById(id);

      if (!todo)
        return res.status(400).json({ message: `no todo with id ${id}` });

      await Todo.findByIdAndDelete(id);

      res.status(200).json({ message: "Todo deleted" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  editTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const { task } = req.body;

      const todo = await Todo.findById(id);

      if (!todo)
        return res.status(400).json({ message: `no todo with id ${id}` });

      const editedTask = await Todo.findByIdAndUpdate(id, {
        task: task,
      });
      res.status(200).json({ message: "Todo Edited", editedTask: editedTask });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};

module.exports = todoController;
