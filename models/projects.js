const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  startdate: { type: Date, required: true },
  enddate: { type: Date, required: true },
  Members: [{ type: String, required: true }],
  technology: [{ type: Object, required: true }],
  status: { type: String, required: true },
  file: { data: Buffer },
});

module.exports = mongoose.model("Project", projectSchema);
