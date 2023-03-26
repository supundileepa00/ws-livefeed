const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const bodexpressyParser = require("express");
const mongoose = require("mongoose");
const express = require("express");

const getTasks = require("./service/tasks");

//import routes
const TaskRouter = require("./routes/task.routes.js");
const { websocketConnection } = require("./websocket");

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("", (req, res) => {
  res.json({ message: "backend api" });

  update();
});

// routes
app.use("/api/v1/tasks", TaskRouter);

const CONNECTION_URL = `${process.env.DB_URL}`;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Running on port :http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error.message);
  });

// Create websocket server
websocketConnection();
