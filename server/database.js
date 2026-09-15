const Database = require("better-sqlite3");

const db = new Database("accessibility.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    issue_type TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    duration TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;