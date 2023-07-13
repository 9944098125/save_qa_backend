const bcryptJs = require("bcryptjs");
const db = require("../db");

const register = (req, res, next) => {
  const { name, email, password, image } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    // console.log(result);
    if (err) {
      return res.status(403).json({ message: "Something went wrong" });
    } else if (result.length > 0) {
      console.log(result);
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }
    const hashedPassword = await bcryptJs.hashSync(password, 10);
    const sql =
      "INSERT INTO users (name, email, password, image) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, image], (err, result) => {
      if (err) {
        return next(err);
      } else if (result.affectedRows === 0) {
        res.status(404).send("Cannot find table");
      } else {
        res.status(201).json({
          message: "User created successfully",
        });
      }
    });
  });
};

module.exports = { register };
