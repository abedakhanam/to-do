const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const todoRouter = require("./router");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use the todoRouter for handling `/api/todos` routes
app.use("/api/todos", todoRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
