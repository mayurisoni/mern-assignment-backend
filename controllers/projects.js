const mongoose = require("mongoose");
const emailsend = require("../MiddleWare/nodeMailor")
const Project = require("../models/projects");
module.exports.getAllProject = async(req, res, next) => {
  try {
    const projects = await Project.find();
    if (projects.length >= 1) {
      res
        .status(200)
        .json({ message: "all Projects listed successfully", projects: projects });
    } else {
      res
        .status(200)
        .json({
          message: "There is No Project Available.Please, Add New Project ",
          projects: projects,
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }

};
module.exports.postProject = async(req, res, next) => {
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
  try {
    const CreatedProject = await project.save();
    emailsend
    res
      .status(201)
      .json({ message: "Project Registered Successfully", CreatedProject: CreatedProject});
     // emailsend
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
module.exports.getSpecificProject = async(req, res, next) => {
  const id = req.params.projectId;
  try {
    const project = await Project.findById(id);
    if (!project) {
      res.status(404).json({ //this
        message: "Not found",
      });
    } else {
      res.status(200).json({ message: "Project Found",project : project });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
 
};
module.exports.updateSpecificProject =async (req, res, next) => {
  const id = req.params.projectId;

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res
      .status(200) //this
      .json({ message: "Project Updated Successfully", UpdatedProject: project });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
module.exports.deleteSpecificProject =async (req, res, next) => {
  const id = req.params.projectId;
  try {
    const project = await Project.remove({ _id: id });
    res.status(200).json({
      message: "Project deleted suceessfully",
      DeletedProject: project,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
