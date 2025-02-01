const UserSchema = require("../Schema/user");
const bcrypt = require("bcrypt");
const genrateToken = require("../utils/genrateToken");
const jwt =require("jsonwebtoken")
const signup = async (req, res, next) => {
  
  const { userName, email, password } = req.body;
  try {
    let Email = await UserSchema.findOne({ email });
    if (Email) {
      return res
        .status(401)
        .json({ message: "already existing email and user " });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await new UserSchema({
      userName,
      email,
      password: hashedPassword,
    })
    await user.save();
    let token = genrateToken(user);
    // In your signup/login controller
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in production
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({ message: "Authentication successful", user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    console.log("trigered")
    const { userName, password } = req.body;
    const user = await UserSchema.findOne({ userName }).select(-"password");
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
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in production
        sameSite: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({ message: "Authentication successful", user });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
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
};

const getUser = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Retrieve the token from the cookie
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

  
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
    const user = await UserSchema.findById(decoded.id).select("-password"); // Fetch user without password
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};

module.exports = { signup, login, logout, getUser };
