const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo.controller");

router.post("/", todoController.createdTodo);
router.delete("/:id", todoController.deleteTodo);
router.get("/", todoController.getTodos);
router.put("/edit/:id", todoController.editTodo);

module.exports = router;
