const router = require("express").Router();

let Task = require("../models/task.model.js");
const { update } = require("../websocket.js");

//Student Registration
router.route("/add").post((req, res) => {
  const title = req.body.title;
  const description = req.body.title;

  const newTask = new Task({
    title,
    description,
  });

  newTask
    .save()
    .then(async () => {
      res.json(newTask);

      await update();
      res.status(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all students
router.route("/").get((req, res) => {
  Task.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete student
router.route("/delete/:id").delete(async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ status: "Task Deleted" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error with delete Student", error: err.message });
    });
});

module.exports = router;
