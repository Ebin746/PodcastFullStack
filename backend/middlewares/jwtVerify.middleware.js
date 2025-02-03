const jwt = require("jsonwebtoken");
const authenticationVerify = (req, res, next) => {

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: token not found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user=decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden: invalid or expired token" });
  }
};

module.exports = { authenticationVerify };
