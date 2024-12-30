const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "you are not authenticated user" });
  }
  const token = authHeader.split("")[1];

  jwt.verify(token, process.env.JWT_SECERT, (err, user) => {
    if (err) return res.status(401).json({ message: "err ", err });
    req.user = user;
    next();
  });
};
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user || req.params.id) {
      return res.status(401).json({ message: "user id and info missing" });
    }
    next();
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user || req.user?.user.isAdmin) {
      return res.status(401).json({ message: "user id and info missing" });
    }
    next();
  });
};
module.exports = { verifyToken, verifyAdmin, verifyUser };
