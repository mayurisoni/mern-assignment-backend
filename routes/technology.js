const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const technologyController = require("../controllers/technology");
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

router.get("/", technologyController.getAllTech);
router.post("/", upload, technologyController.postTechnology);
router.get("/:techid", technologyController.getSpecificTechnology);
router.patch(
  "/:techid",

  upload,
  technologyController.updateSpecificTechnology
);
router.delete(
  "/:techid",

  technologyController.deleteSpecificTechnology
);
module.exports = router;
