const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/reports", (req, res) => {
  const reports = db
    .prepare("SELECT * FROM reports ORDER BY created_at DESC")
    .all();

  res.json(reports);
});

app.post("/api/reports", (req, res) => {
  const {
    issueType,
    location,
    description,
    duration
  } = req.body;

  if (!issueType || !location || !description || !duration) {
    return res.status(400).json({
      error: "All fields are required."
    });
  }

  const result = db.prepare(`
    INSERT INTO reports (
      issue_type,
      location,
      description,
      duration
    )
    VALUES (?, ?, ?, ?)
  `).run(
    issueType,
    location,
    description,
    duration
  );

  const newReport = db
    .prepare("SELECT * FROM reports WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newReport);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});