import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const exists = await userModel.findOne({ email });
    // checking is user alreay exists
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }

    // /validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    // chaecking password length <8 or strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, message: "User successfully register" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    // compare passwoed

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.json({ success: false, message: "Invalid user" });
    }
    //  const {...rest} = user._doc
    // get  token
    const token = createToken(user);
    // const token = createToken(user._id);

    res.json({ success: true, message: "User successfully login", token });
  } catch (error) {
    console.log(error);
  }
};

export { registerUser, loginUser };
