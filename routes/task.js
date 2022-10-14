const taskController = require("../controllers/task");
const express = require("express");
const router = express.Router();
router.get("/", taskController.getAllTask);
router.post("/", taskController.postTask);
router.get("/:taskid", taskController.getSpecificTask);
router.patch("/:taskid", taskController.updateSpecificTask);
router.delete("/:taskid", taskController.deleteSpecificTask);
module.exports = router;
