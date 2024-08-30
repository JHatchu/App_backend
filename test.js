// testConnection.js
const pool = require("./db"); // Adjust path if necessary

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Connection test successful:", rows);
  } catch (error) {
    console.error("Connection test failed:", error.message);
  }
}

testConnection();
