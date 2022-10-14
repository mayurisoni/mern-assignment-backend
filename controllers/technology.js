const mongoose = require("mongoose");
const Technology = require("../models/technology");
module.exports.getAllTech = (req, res, next) => {
  Technology.find()
    .exec()
    .then((docs) => {
      const response = {
        technologies: docs.map((doc) => {
          return {
            technologyName: doc.technologyName,
            Resources: doc.Resources,
            _id: doc._id,
            status: doc.status,
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
module.exports.postTechnology = (req, res, next) => {
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
  technology
    .save()
    .then((result) => {
      console.log(result);

      res.status(200).json({
        message: "created technology suceessfully",
        createdTechnology: {
          technologyName: result.technologyName,
          Resources: result.Resources,
          status: result.status,
          file: req.file.filename,
          _id: result._id,
        },
        request: {
          type: "GET",
          url: "http://localhost:8080/technologies/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ error: err });
    });
};
module.exports.getSpecificTechnology = (req, res, next) => {
  const id = req.params.techid;
  Technology.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          message: "get specific technology suceessfully",
          technology: doc,
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
module.exports.updateSpecificTechnology = (req, res, next) => {
  const id = req.params.techid;

  console.log(req.file.filename);
  Technology.findByIdAndUpdate(
    id,
    { ...req.body, file: req.file.filename },
    { new: true }
  )

    .exec()
    .then((doc) => {
      return res.status(200).json({
        message: " product updated suceessfully",
        technologies: doc,
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
module.exports.deleteSpecificTechnology = (req, res, next) => {
  const id = req.params.techid;
  Technology.remove({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "technology deleted suceessfully",
        technology: doc,
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
