const jwt = require("jsonwebtoken");

const authenticationVerify = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Token not found" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id; // Attach user ID to request
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden: Invalid or expired token" });
  }
};

module.exports = { authenticationVerify };
