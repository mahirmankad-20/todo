const express = require("express");
const con = require("../connection");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Get all todos
const getTodo = (req, res) => {
  const sqlQuery = "SELECT * FROM todo";

  con.query(sqlQuery, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database query error",
        error: err.message,
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetched todos successfully",
      todos: results,
    });
  });
};

// Add a new todo
const addTodo = (req, res) => {
  const { todo } = req.body;
  

  // Check if `todo` is provided
  if (!todo) {
    return res.status(400).json({
      success: false,
      message: "Todo text is required",
    });
  }

  const id = uuidv4(); // Generate unique ID
  const sqlQuery = "INSERT INTO todo (id, todo) VALUES (?, ?)";

  con.query(sqlQuery, [id, todo], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database query error",
        error: err.message,
      });
    }
    res.status(201).json({
      success: true,
      message: "Todo added successfully",
      results,
    });
  });
};

module.exports = { getTodo, addTodo };
