const express = require("express");
const router = express.Router(); // ✅ define router here
const Attendance = require("../models/Attendance");

// GET attendance for today with empid and status
router.get("/today", async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const attendedToday = await Attendance.find({
      date: { $gte: todayStart, $lte: todayEnd }
    }).select("empid status");

    res.json(attendedToday); // [{ empid: "101", status: "Present" }, ...]
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch today's attendance" });
  }
});

module.exports = router;

// POST attendance
router.post("/", async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json({ message: "Attendance recorded" });
  } catch (err) {
    console.error("Error saving attendance:", err);
    res.status(500).json({ error: "Failed to save attendance" });
  }
});

