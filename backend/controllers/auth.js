const UserSchema = require("../Schema/user");
const bcrypt = require("bcrypt");
const genrateToken = require("../utils/genrateToken");


const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    let user = await UserSchema.findOne({ email });

    if (user) {
      return res
        .status(401)
        .json({ message: "already existing email and user " });
    }
    hashedPassword = await bcrypt.hash(password, 10);

    user = await new UserSchema({
      userName,
      email,
      password: hashedPassword
    }).save();
    let token = genrateToken(user);
// In your signup/login controller
res
  .status(200)
  .cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true in production
    sameSite: 'Strict',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
  .json({ message: 'Authentication successful', user });


  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await UserSchema.findOne({ userName }).select(-"password")
    if (!user) {
      return res
        .status(404)
        .json({ messgae: " not found the data on userName:", userName });
    }
    const realPassword = await bcrypt.compare(password, user.password);
    if (!realPassword) {
      return res.status(404).json({ message: "not matching password" });
    }
    let token = genrateToken(user);
// In your signup/login controller
res
  .status(200)
  .cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true in production
    sameSite: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
  .json({ message: 'Authentication successful', user });

  } catch (error) {
    next(error);
  }
};

const logout=async (req,res,next)=>{
try {
  res.clearCookie("token", {
    httpOnly: true, // Ensures the cookie can't be accessed by JavaScript
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production (https)
    sameSite: "Strict", // Prevents CSRF attacks
    path: "/", // Specifies the path for which the cookie is valid
  });

  res.status(200).json({ message: "Logged out successfully" });
} catch (error) {
  next();
}
}
module.exports = { signup, login,logout };
