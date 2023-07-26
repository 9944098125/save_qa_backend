const bcryptJs = require("bcryptjs");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { sendRegistrationEmail } = require("../helpers/nodemailer");

const register = (req, res) => {
  // taking the details request body
  const { name, email, password, image } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Some Internal server error" });
    } else if (result.length > 0) {
      return res
        .status(403)
        .json({ message: "User with this email already exists..." });
    }
    const saltRounds = bcryptJs.genSaltSync(10);
    const hashedPassword = bcryptJs.hashSync(password, saltRounds);
    const sql =
      "INSERT INTO users (name, email, password, image) VALUES (?, ?, ?, ?)";
    const values = [name, email, hashedPassword, image];
    db.query(sql, values, (err, response) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Internal error" });
      } else if (response.affectedRows === 0) {
        return res.status(400).json({ message: "No Table Found" });
      } else {
        sendRegistrationEmail(email);
        console.log(email);
        res.status(201).json({
          message: `Thank you ${name?.split(" ")[0]} for registering with us`,
        });
      }
    });
  });
};

const login = (req, res) => {
  // taking request body
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(403).json({ message: "Internal error" });
    }
    const user = result[0];
    if (!user) {
      return res.status(403).json({ message: "User Not Found" });
    }
    bcryptJs.compare(password, user.password, (err, response) => {
      if (err) {
        return res.status(403).json({ message: "Internal error" });
      } else if (!response) {
        return res.status(400).json({ message: "Wrong Password" });
      }
      const userId = user.id;
      const token = jwt.sign({ userId }, process.env.SECRET_KEY);
      res.status(200).json({
        message: "Login",
        user: user,
        token: token,
      });
    });
  });
};

// const getUsers = (req, res, next) => {
//   const sql = "SELECT * FROM users";
//   db.query(sql, (err, result) => {
//     if (err) {
//       return res.status(400).json({ message: "No table found" });
//     } else if (result) {
//       console.log(result);
//       res.status(200).json({ message: "Users fetched successfully", result });
//     }
//   });
// };

// const deleteAllUsers = (req, res, next) => {
//   const sql = "DELETE FROM users";
//   db.query(sql, (err, result) => {
//     if (err) {
//       return res.status(400).json({ message: "No Table Found" });
//     } else {
//       res.status(200).json({ message: "Deleted" });
//     }
//   });
// };

module.exports = { register, login };
