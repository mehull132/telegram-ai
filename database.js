const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./memory.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT
    )
  `);
});

console.log("DATABASE CONNECTED");

module.exports = db;
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      user_id TEXT,
      memory_key TEXT,
      memory_value TEXT,
      PRIMARY KEY(user_id, memory_key)
    )
  `);

});
