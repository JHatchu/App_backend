const pool = require("../db");

class TodoDao {
    async getAll() {
        try {
            const [rows] = await pool.query(
                "SELECT * FROM todos ORDER BY todo_id;"
            );
            return rows;
        } catch (error) {
            console.log("Error fetching all todos:", error.message);
        }
    }

    async getById(id) {
        try {
            const [rows] = await pool.query(
                "SELECT * FROM todos WHERE todo_id = ?",
                [id]
            );
            return rows[0];
        } catch (error) {
            console.log("Error fetching todo by ID:", error.message);
        }
    }

    async getByUserId(id) {
        try {
            const [rows] = await pool.query(
                "SELECT * FROM todos WHERE user_id = ? ORDER BY todo_id",
                [id]
            );
            return rows;
        } catch (error) {
            console.log("Error fetching todos by user ID:", error.message);
        }
    }

    async addTodo(description, user_id) {
        try {
            // Insert the new todo and get the result
            const [result] = await pool.query(
                "INSERT INTO todos (description, user_id) VALUES (?, ?)",
                [description, user_id]
            );
    
            // Fetch the inserted todo using the insertId
            const todoId = result.insertId;
            const [rows] = await pool.query(
                "SELECT * FROM todos WHERE todo_id = ?",
                [todoId]
            );
    
            return rows[0];
        } catch (error) {
            console.log("Error adding new todo:", error.message);
            throw error; // Consider rethrowing the error or handling it as needed
        }
    }
    

    async deleteTodo(todoId) {
        try {
            await pool.query(
                "DELETE FROM todos WHERE todo_id = ?",
                [todoId]
            );
        } catch (error) {
            console.log("Error deleting todo:", error.message);
        }
    }

    async updateTodo(description, todoId) {
        try {
            await pool.query(
                "UPDATE todos SET description = ? WHERE todo_id = ?",
                [description, todoId]
            );
        } catch (error) {
            console.log("Error updating todo:", error.message);
        }
    }
}

module.exports = new TodoDao();
