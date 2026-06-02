const db = require('./database');

function saveProfile(userId, key, value) {

  db.run(
    `INSERT OR REPLACE INTO memories
    (user_id, memory_key, memory_value)
    VALUES (?, ?, ?)`,
    [userId, key, value]
  );

}

function getProfile(userId) {

  return new Promise((resolve, reject) => {

    db.all(
      `SELECT * FROM memories
       WHERE user_id = ?`,
      [userId],
      (err, rows) => {

        if (err) reject(err);
        else resolve(rows);

      }
    );

  });

}

module.exports = {
  saveProfile,
  getProfile
};
