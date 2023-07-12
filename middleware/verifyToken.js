const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token." });
    }

    // Attach the decoded payload to the request object for use in subsequent middleware or routes
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
