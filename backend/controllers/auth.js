const UserSchema = require("../Schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};

// Signup Function
const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  console.log(userName);
  
  try {
    let existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let user = new UserSchema({
      userName,
      email,
      password: hashedPassword,
    });

    // Add specific error handling for save operation
    try {
      const savedUser = await user.save();
      console.log('User saved successfully:', savedUser._id);
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      return res.status(500).json({ message: "Error saving user to database", error: saveError.message });
    }

    let token = generateToken(user);
    res.status(200).json({ message: "Signup successful", user, token });
  } catch (error) {
    console.error('Signup error:', error);
    next(error);
  }
};

// Login Function
const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const user = await UserSchema.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    let token = generateToken(user);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    next(error);
  }
};

// Logout Function (Frontend handles token removal)
const logout = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// Get User Function
const getUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserSchema.findById(decoded.id).select("-password").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};

module.exports = { signup, login, logout, getUser };
