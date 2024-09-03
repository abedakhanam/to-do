const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "mysqlclient",
  password: "admin",
  database: "clientserver",
  port: 5432,
});

const getAllTodos = async () => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
  return result.rows;
};

const addTodo = async (task) => {
  const result = await pool.query(
    "INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING *",
    [task, false]
  );
  return result.rows[0];
};

const modifyTodo = async (id, completed) => {
  const result = await pool.query(
    "UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *",
    [completed, id]
  );
  return result.rows[0] || null;
};

const removeTodo = async (id) => {
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
};

module.exports = {
  getAllTodos,
  addTodo,
  modifyTodo,
  removeTodo,
};
