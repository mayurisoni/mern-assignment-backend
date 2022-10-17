const mongoose = require("mongoose");
const Task = require("../models/task");
module.exports.getAllTask = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    if (tasks.length >= 1) {
      res
        .status(200)
        .json({ message: "all tasks listed successfully", tasks: tasks });
    } else {
      res
        .status(200)
        .json({
          message: "There is No Task Available.Please, Add New Task ",
          tasks: tasks,
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
module.exports.postTask = async (req, res, next) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    TaskName: req.body.TaskName,
    estimatedDuration: req.body.estimatedDuration,
    finalTime: req.body.finalTime,
    comment: req.body.comment,
    developerName: req.body.developerName,
    date: req.body.date,
    projectName: req.body.projectName,
    projectId: req.body.projectId,
  });
  try {
    const CreatedTask = await task.save();
    res
      .status(201)
      .json({ message: "Task Registered Successfully", CreatedTask: CreatedTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
module.exports.getSpecificTask = async (req, res, next) => {
  const id = req.params.taskid;
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ //this
        message: "Not found",
      });
    } else {
      res.status(200).json({ message: "Task Found", task: task });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
module.exports.updateSpecificTask = async (req, res, next) => {
  const id = req.params.taskid;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res
      .status(200) //this
      .json({ message: "Task Updated Successfully", UpdatedTask: task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
module.exports.deleteSpecificTask = async (req, res, next) => {
  const id = req.params.taskid;
  try {
    const task = await Task.remove({ _id: id });
    res.status(204).json({
      message: "Task deleted suceessfully",
      Deletedtask: task,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
