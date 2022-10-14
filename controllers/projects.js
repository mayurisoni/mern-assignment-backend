const mongoose = require("mongoose");

const Project = require("../models/projects");
module.exports.getAllProject = (req, res, next) => {
  Project.find()
    .exec()
    .then((docs) => {
      const response = {
        projects: docs.map((doc) => {
          return {
            _id: doc._id,
            projectName: doc.projectName,
            projectDescription: doc.projectDescription,
            startdate: doc.startdate,
            enddate: doc.enddate,
            status: doc.status,
            Members: doc.Members,
            technology: doc.technology,
            request: {
              type: "GET",
              url: "http://localhost:8080/projects/" + doc._id,
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
module.exports.postProject = (req, res, next) => {
  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    projectName: req.body.projectName,
    projectDescription: req.body.projectDescription,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    status: req.body.status,
    Members: req.body.Members,
    technology: req.body.technology,
    file: {
      data: req.file.filename,
    },
  });
  project
    .save()
    .then((doc) => {
      console.log(doc);

      res.status(200).json({
        message: "created project suceessfully",
        createdTechnology: {
          _id: doc._id,
          projectName: doc.projectName,
          projectDescription: doc.projectDescription,
          startdate: doc.startdate,
          enddate: doc.enddate,
          status: doc.status,
          Members: doc.Members,
          technology: doc.technology,
        },
        request: {
          type: "GET",
          url: "http://localhost:8080/projects/" + doc._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ error: err });
    });
};
module.exports.getSpecificProject = (req, res, next) => {
  const id = req.params.projectId;
  Project.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          message: "get specific project suceessfully",
          technology: doc,
          request: {
            type: "GET",
            url: "http://localhost:8080/projects/",
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
module.exports.updateSpecificProject = (req, res, next) => {
  const id = req.params.projectId;

  Project.findByIdAndUpdate(
    id,
    { ...req.body, file: req.file.filename },
    { new: true }
  )

    .exec()
    .then((doc) => {
      console.log(req.body);
      return res.status(200).json({
        message: " project updated suceessfully",
        technologies: doc,
        // request: {
        //   type: "GET",
        //   url: "http://localhost:8080/technologies/" + doc._id,
        // },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(600).json({ error: err });
    });
};
module.exports.deleteSpecificProject = (req, res, next) => {
  const id = req.params.projectId;
  Project.remove({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "technology deleted suceessfully",
        technology: doc,
        request: {
          type: "GET",
          url: "http://localhost:8080/projects/" + doc._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(600).json({ error: err });
    });
};
