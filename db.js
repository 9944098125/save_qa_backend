const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Srinivas@8",
  database: "save_qa",
});

module.exports = db;
