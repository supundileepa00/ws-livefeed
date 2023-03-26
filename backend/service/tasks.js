const Task = require("../models/task.model");

// const getTasks = () => {
//   Task.find()
//     .then((tasks) => {
//       // return JSON.stringify([tasks]);
//       // let data = ["ad", "sdsd", "sdsd"];
//       // return JSON.stringify(data);
//       const data = ["sdsd", "sdsd", "sdsd", "sdsd", "sdsd"];
//       return JSON.stringify(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       return "ERROR";
//     });
// };

async function getTasks() {
  try {
    const tasks = await Task.find();
    return JSON.stringify(tasks);
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}
module.exports = getTasks;
