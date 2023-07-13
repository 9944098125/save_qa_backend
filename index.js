const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./db");
const authRoute = require("./routes/auth");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// parse application / www url encoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application / json
app.use(bodyParser.json());

// use the app for routes here and then error middleware next()
app.use("/api/auth/", authRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 409;
  const errorMessage = err.message || "Something went wrong, Please try again";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// define port from env file and an alternative port
const port = process.env.PORT || 5001;

// database connected or not ?
db.getConnection(function (err) {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.listen(port, () => {
  console.log(`App is now running on port: [${port}]`);
});

// require('crypto').randomBytes(64).toString('hex')
