const mongoose = require("mongoose");
const { nodemailor } = require("../MiddleWare/nodeMailor");
const nodemailer = require("nodemailer");
const { errorResponse } = require("../MiddleWare/response");
const { successResponse } = require("../MiddleWare/successResponse");
const Project = require("../models/projects");
const User = require("../models/users");
module.exports.getAllProject = async (req, res, next) => {
  try {
    const projectsdata = await Project.find();
    if (projectsdata.length >= 1) {
      
      //  var projects = JSON.stringify(projectsdata);
      //  projects = projects.replace(/,/g, "")
       
      //  console.log(projects)
      successResponse(res, 200, "all Project listed successfully",projectsdata);
      // res
      //   .status(200)
      //   .json({ message: "all Projects listed successfully", projects: projects });
    } else {
      successResponse(
        res,
        200,
        "There is No Project Available.Please, Add New Project ",
        projects
      );
      // res
      //   .status(200)
      //   .json({
      //     message: "There is No Project Available.Please, Add New Project ",
      //     projects: projects,
      //   });
    }
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.postProject = async (req, res, next) => {
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
  const emailList = async () => {
    const user = await User.find({ name: req.body.Members.split(",") });
    const list = user.map((u) => u.email);
    // console.log(JSON.stringify(list.join(",")));
    return list;
    // return JSON.stringify(list.join(","))
  };

  const timeline = () => {
    var date1 = new Date(req.body.startdate);
    var date2 = new Date(req.body.enddate);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  };
  try {
    const CreatedProject = await project.save();

    nodemailor(
      req.body.projectName,
      req.body.projectDescription,
      req.file.filename,
      timeline,
      emailList
    );
    successResponse(
      res,
      200,
      "Project Registered Successfully",
      CreatedProject
    );
    // res
    //   .status(201)
    //   .json({ message: "Project Registered Successfully", CreatedProject: CreatedProject});
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.getSpecificProject = async (req, res, next) => {
  const id = req.params.projectId;
  try {
    const project = await Project.findById(id);
    if (!project) {
      errorResponse(res, 404, "Not found");
      // res.status(404).json({ //this
      //   message: "Not found",
      // });
    } else {
      successResponse(res, 200, "Project Found", project);
      // res.status(200).json({ message: "Project Found",project : project });
    }
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.updateSpecificProject = async (req, res, next) => {
  const id = req.params.projectId;

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!project) {
      errorResponse(res, 404, "Not found");
      // res.status(404).json({

      //   message: "Not found",
      // });
    } else {
      successResponse(res, 200, "Project Updated Successfully", project);
    }

    // res
    //   .status(200)
    //   .json({ message: "Project Updated Successfully", UpdatedProject: project });
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
module.exports.deleteSpecificProject = async (req, res, next) => {
  const id = req.params.projectId;
  try {
    const project = await Project.remove({ _id: id });
    successResponse(res, 200, "Project deleted suceessfully", project);
    // res.status(200).json({
    //   message: "Project deleted suceessfully",
    //   DeletedProject: project,
    // });
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
