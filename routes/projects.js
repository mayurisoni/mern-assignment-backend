const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const projectController = require("../controllers/projects");
var Storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: Storage }).single("file");

router.get("/", projectController.getAllProject);
router.post("/",  upload, projectController.postProject);
router.get("/:projectId", projectController.getSpecificProject);
router.patch(
  "/:projectId",upload,

 projectController.updateSpecificProject
);
router.delete(
  "/:projectId",

 projectController.deleteSpecificProject
);
module.exports = router;