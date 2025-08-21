const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee"); // Check path is correct

// POST route to register new employee
router.post("/", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error("Error saving employee:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

// GET by empid
router.get("/:empid", async (req, res) => {
  try {
    const emp = await Employee.findOne({ empid: req.params.empid });
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    res.json(emp);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// UPDATE
router.put("/:empid", async (req, res) => {
  try {
    const updated = await Employee.findOneAndUpdate(
      { empid: req.params.empid },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Employee not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE
router.delete("/:empid", async (req, res) => {
  try {
    const deleted = await Employee.findOneAndDelete({ empid: req.params.empid });
    if (!deleted) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});


// GET all employees with status "Active"
router.get("/status/active", async (req, res) => {
  try {
    const activeEmployees = await Employee.find({ status: "Active" }).select("empid name designation status");
    res.json(activeEmployees);
  } catch (error) {
    console.error("Error fetching active employees:", error);
    res.status(500).json({ error: "Server Error" });
  }
});


