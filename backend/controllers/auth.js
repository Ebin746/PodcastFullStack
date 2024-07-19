const UserSchema = require("../Schema/user");
const bcrypt = require("bcrypt");
const signup = async (req, res, nexr) => {
  const { username, email, password } = req.body;
  try {

   let user = UserSchema.findOne(email);
    if (user)
      return res
        .status(401)
        .json({ message: "already existing email and user " });
    hashedPassword = await bcrypt.hash(password, 10);
    user = await UserSchema({
      username,
      email,
      passsword: hashedPassword,
    });

    res.status(201).json({ message: "successfully signup ", user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserSchema.find(username);
    if (!user)
      return res
        .status(404)
        .json({ messgae: " not found the data on username:", username });
    unHashedPassword = await bcrypt.compare(password, user.password);
    if (!unHashedPassword)
      return res.status(404).json({ message: "not matching password" });
    res.status(200).json({ message: "succesfully login ", user });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, signup };
