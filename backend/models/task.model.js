const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  dscription: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
