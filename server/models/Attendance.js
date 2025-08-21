const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  empid: String,
  name: String,
  date: { type: Date, default: Date.now },
  status: String, // Present, Absent, Leave
  reason: String
}, {
  versionKey: false
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
