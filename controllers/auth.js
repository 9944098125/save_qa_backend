const bcryptJs = require("bcryptjs");
const db = require("../db");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  // taking request body from frontend
  const { name, email, password, image } = req.body;
  // checking if a user with the email in the request body exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    // console.log(result);
    if (err) {
      return res.status(403).json({ message: "Something went wrong" });
    } else if (result.length > 0) {
      // and if exists we give this response or else we proceed
      // console.log(result);
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }
    // then implement salt rounds for password to be hashed
    const salt = bcryptJs.genSaltSync(10);
    const hashedPassword = bcryptJs.hashSync(password, salt);
    // console.log(hashedPassword);
    // now create the user with the name, email and image
    // in request body and password is hashed  and
    // all these are sent to be saved in the database
    const sql =
      "INSERT INTO users (name, email, password, image) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, image], (err, result) => {
      if (err) {
        return next(err);
      } else if (result.affectedRows === 0) {
        res.status(404).send("Cannot find table");
      } else {
        res.status(201).json({
          message: `Congratulations ${name}, you have created an account with us !!`,
        });
      }
    });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Internal error" });
    }
    const user = result[0];
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    bcryptJs.compare(password, user.password, (err, response) => {
      if (err) {
        return res.status(403).json({ message: "Internal server error" });
      }
      if (!response) {
        return res
          .status(400)
          .json({ message: "Invalid Credentials, Wrong Password." });
      }
      const userId = user.id;
      const token = jwt.sign({ userId }, process.env.SECRET_KEY);
      res.status(200).json({
        message: "Login Success",
        token: token,
        user: user,
      });
    });
  });
};

const getUsers = (req, res, next) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "No table found" });
    } else if (result) {
      console.log(result);
      res.status(200).json({ message: "Users fetched successfully", result });
    }
  });
};

const deleteAllUsers = (req, res, next) => {
  const sql = "DELETE FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "No Table Found" });
    } else {
      res.status(200).json({ message: "Deleted" });
    }
  });
};

module.exports = { register, login, getUsers, deleteAllUsers };
