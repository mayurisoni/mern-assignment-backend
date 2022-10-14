const mongoose = require("mongoose");
const Task = require("../models/task");
module.exports.getAllTask = (req, res, next) => {
  Task.find()
    .exec()
    .then((docs) => {
      const response = {
        task: docs.map((doc) => {
          return {
            TaskName: doc.TaskName,
            estimatedDuration: doc.estimatedDuration,
            finalTime: doc.finalTime,
            comment: doc.comment,
            developerName: doc.developerName,
            date: doc.date,
            projectName: doc.projectName,
            projectId: doc.projectId,
            request: {
              type: "GET",
              url: "http://localhost:8080/technologies/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(600).json({ error: err });
    });
};
module.exports.postTask = (req, res, next) => {
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
  task
    .save()
    .then((result) => {
      console.log(result);

      res.status(200).json({
        message: "created task suceessfully",
        createdTechnology: {
          TaskName: result.technologyName,
          estimatedDuration: result.Resources,
          finalTime: result.finalTime,
          developerName: result.developerName,
          date: result.date,
          projectName: result.projectName,
          projectId: result.projectId,
          _id: result._id,
        },
        request: {
          type: "GET",
          url: "http://localhost:8080/tasks/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ error: err });
    });
};
module.exports.getSpecificTask = (req, res, next) => {
  const id = req.params.taskid;
  Task.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          message: "get specific task suceessfully",
          task: doc,
          request: {
            type: "GET",
            url: "http://localhost:8080/technologies/",
          },
        });
      } else {
        res.status(404).json({ message: "no valid id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(600).json({ error: err });
    });
};
module.exports.updateSpecificTask = (req, res, next) => {
  const id = req.params.taskid;

  console.log(req.file.filename);
  Task.findByIdAndUpdate(id, { ...req.body }, { new: true })

    .exec()
    .then((doc) => {
      return res.status(200).json({
        message: " task updated suceessfully",
        task: doc,
        request: {
          type: "GET",
          url: "http://localhost:8080/task/" + doc._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(600).json({ error: err });
    });
};
module.exports.deleteSpecificTask = (req, res, next) => {
  const id = req.params.taskid;
  Task.remove({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "task deleted suceessfully",
        task: doc,
        request: {
          type: "GET",
          url: "http://localhost:8080/technologies/" + doc._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(600).json({ error: err });
    });
};
