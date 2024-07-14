require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const connectDb = require("./src/config/mongodb.config");
const todoRouter = require("./src/routes/todo.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/v1/todo", todoRouter);

connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
