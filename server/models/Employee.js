const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empid: String,
  name: String,
  mobile: String,
  dob: Date,
  gender: String,
  idtype: String,
  idnum: String,
  designation: String,
  doj: Date,
  experience: Number,
  salary: Number,
  maritalStatus: String,
  status: String,
  address: String
}, {
  versionKey: "__v" // required format
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
