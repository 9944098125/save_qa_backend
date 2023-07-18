const db = require("../db");

const createQA = (req, res, next) => {
  const { question, answer, tool_id, user_id } = req.body;
  // taking these details from request body
  // query for creating a row
  if (answer.length < 50) {
    return res
      .status(400)
      .json({ message: "Answer should be at least 50 characters" });
  }
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
  // getting qa sets according to the user and tool_id
  const sql = "SELECT * FROM qa WHERE user_id = ? AND tool_id = ?";
  const values = [userId, toolId];
  db.query(sql, values, (err, result) => {
    if (err) {
      next(err);
    } else if (result) {
      // console.log(result);
      // result is an array
      res.status(200).json(result);
    }
  });
};

const updateQA = (req, res, next) => {
  const { question, answer } = req.body;
  const { qaId } = req.params;
  // taking question and answer from request body and that id of qa set in params
  // setting that body in the qa table where it is the given id
  const sql = "UPDATE qa SET question = ?, answer = ? WHERE id = ?";
  const values = [question, answer, qaId];
  db.query(sql, values, (err, result) => {
    if (err) {
      return next(err);
    } else if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Something gone wrong..." });
    } else if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: "Updated the question and answer Successfully" });
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
  // deleting the qa set with getting it's id
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
