const mongoose = require("mongoose");
const Technology = require("../models/technology");
module.exports.getAllTech = async(req, res, next) => {
  try {
    const technologies = await Technology.find();
    if (technologies.length >= 1) {
      res
        .status(200)
        .json({ message: "all technologies listed successfully", technologies: technologies });
    } else {
      res
        .status(200)
        .json({
          message: "There is No Technologies Available.Please, Add New Technology ",
          technologies: technologies
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
module.exports.postTechnology = async(req, res, next) => {
  const technology = new Technology({
    _id: new mongoose.Types.ObjectId(),
    technologyName: req.body.technologyName,
    Resources: req.body.Resources,
    status: req.body.status,
    file: {
      data: req.file.filename,
      contentType: "image/png",
    },
  });
  try {
    const Createdtechnology = await technology.save();
    res
      .status(201)
      .json({ message: "Technology Registered Successfully", Createdtechnology: Createdtechnology });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
module.exports.getSpecificTechnology =async (req, res, next) => {
  const id = req.params.techid;
  try {
    const technology = await Technology.findById(id);
    if (!technology) {
      res.status(404).json({ //this
        message: "Not found",
      });
    } else {
      res.status(200).json({ message: "Technology Found", technology: technology });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
module.exports.updateSpecificTechnology = async(req, res, next) => {
  const id = req.params.techid;

  try {
    const technology = await Technology.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res
      .status(200) //this
      .json({ message: "Technology Updated Successfully", Updatedtechnology: technology });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
module.exports.deleteSpecificTechnology =async (req, res, next) => {
  const id = req.params.techid;
  try {
    const technology = await Technology.remove({ _id: id });
    res.status(202).json({
      message: "Technology deleted suceessfully",
      DeletedTechnology: technology,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
