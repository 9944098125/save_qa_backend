const db = require("../db");

const createQA = (req, res, next) => {
  const { question, answer, tool_id, user_id } = req.body;
  const sql =
    "INSERT INTO qa (question, answer, tool_id, user_id) VALUES (?, ?, ?, ?)";
  const values = [question, answer, tool_id, user_id];
  db.query(sql, values, (err, result) => {
    if (err) {
      return next(err);
    } else if (result.affectedRows > 0) {
      res
        .status(201)
        .json({ message: "Question & Answer created successfully" });
    }
  });
};

const getQA = (req, res, next) => {
  const { userId, toolId } = req.params;
  const sql = "SELECT * FROM qa WHERE user_id = ? AND tool_id = ?";
  const values = [userId, toolId];
  db.query(sql, values, (err, result) => {
    if (err) {
      next(err);
    } else if (result) {
      // console.log(result);
      res.status(200).json(result);
    }
  });
};

const updateQA = (req, res, next) => {
  const { question, answer, tool_id } = req.body;
  const { qaId } = req.params;
  const sql =
    "UPDATE qa SET question = ?, answer = ?, tool_id = ? WHERE id = ?";
  const values = [question, answer, tool_id, qaId];
  db.query(sql, values, (err, result) => {
    if (err) {
      return next(err);
    } else if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Something gone wrong..." });
    } else if (result.affectedRows > 0) {
      res.status(200).json({ message: "Update Success" });
    }
  });
};

const getAllQA = (req, res, next) => {
  const sql = "SELECT * FROM qa";
  db.query(sql, (err, result) => {
    if (err) {
      return next(err);
    } else {
      res.json(result);
    }
  });
};

const deleteQA = (req, res, next) => {
  const { qaId } = req.params;
  const sql = "DELETE FROM qa WHERE ID = ?";
  db.query(sql, [qaId], (err, result) => {
    if (err) {
      return next(err);
    } else if (result.affectedRows === 0) {
      return res
        .status(403)
        .json({ message: "could not find any row with that id" });
    }
    res.status(200).json({ message: "Deleted Successfully" });
  });
};

module.exports = { createQA, getQA, updateQA, deleteQA, getAllQA };
