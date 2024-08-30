const pool = require("../db");

class UserDao {
  // Add a new user
  async add(firstName, lastName, email, password) {
    try {
      const [result] = await pool.query(
        "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
        [firstName, lastName, email, password]
      );
      // Return the inserted user's ID or the entire result if needed
      return { userId: result.insertId };
    } catch (error) {
      console.error("Error inserting user:", error.message);
      throw error; // Rethrow the error for higher-level handling
    }
  }

  // Get a user by email
  async getByEmail(email) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      // Return the first user found or null if no user is found
      return rows[0] || null;
    } catch (error) {
      console.error("Error fetching user by email:", error.message);
      throw error; // Rethrow the error for higher-level handling
    }
  }
}

module.exports = new UserDao();
