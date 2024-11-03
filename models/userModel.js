const db = require('../config/db');

const User = {
  create: async (data) => {
    const { userName, password } = data;
    const result = await db.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [userName, password]
    );
    return result.rows[0];
  },
  findOne: async (data) => {
    const { userName } = data;
    const result = await db.query(
      `SELECT * FROM users WHERE username = $1 LIMIT 1`,
      [userName]
    );
    return result.rows[0];
  },
};

module.exports = User;
