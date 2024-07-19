const UserSchema = require("../Schema/user");
const bcrypt = require("bcrypt");
const signup = async (req, res, next) => {
  const { userName, email, password, imageUrl } = req.body;
  try {
    let user = await UserSchema.findOne({ email });

    if (user)
      return res
        .status(401)
        .json({ message: "already existing email and user " });
    hashedPassword = await bcrypt.hash(password, 10);
    user = await new UserSchema({
      userName,
      email,
      password: hashedPassword,
      imageUrl,
    }).save();

    res.status(201).json({ message: "successfully signup ", user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await UserSchema.findOne({ userName });
    if (!user)
   {   return res
        .status(404)
        .json({ messgae: " not found the data on userName:", userName });}
    const unHashedPassword = await bcrypt.compare(password, user.password);
    if (!unHashedPassword){ return res.status(404).json({ message: "not matching password" });}
    res.status(200).json({ message: "succesfully login ", user });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };
