const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoute = require("./routes/auth");
const qaRoute = require("./routes/qa");

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// parse application / www url encoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application / json
app.use(bodyParser.json());

// use the app for routes here and then error middleware next()

app.use("/api/auth/", authRoute);
app.use("/api/qa/", qaRoute);

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
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is now running on port: [${port}]`);
});

// require('crypto').randomBytes(64).toString('hex')
