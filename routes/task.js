const taskController = require("../controllers/task");
const express = require("express");
const router = express.Router();
const multer = require("multer");
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
router.get("/", taskController.getAllTask);
router.post("/",  upload,  taskController.postTask);
router.get("/:taskid", taskController.getSpecificTask);
router.patch("/:taskid",upload, taskController.updateSpecificTask);
router.delete("/:taskid", taskController.deleteSpecificTask);
module.exports = router;
