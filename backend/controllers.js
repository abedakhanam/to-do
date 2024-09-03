const { getAllTodos, addTodo, modifyTodo, removeTodo } = require("./models");

const getTodos = async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createTodo = async (req, res) => {
  const { task } = req.body;
  try {
    const newTodo = await addTodo(task);
    res.json(newTodo);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const updatedTodo = await modifyTodo(id, completed);
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await removeTodo(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
