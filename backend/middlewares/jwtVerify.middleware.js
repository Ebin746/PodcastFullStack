const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({ message: "you are not authenticated user" });}
    const token=authHeader.split("")[1];

  jwt.verify(token, process.env.JWT_SECERT, (err, user) => {
    if (err) return res.status(401).json({ message: "err ", err });
    req.user = user;
    next();
  });
};

module.exports={verifyToken

};

