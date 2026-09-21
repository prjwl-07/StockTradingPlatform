const bcrypt = require("bcrypt");
const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Generate JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 6. Set authentication cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "Lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // 7. Send response
    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // find the user by email
    let user = await User.findOne({ email: email });
    // if email not exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // check if the password is correct or not by bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "Lax", // or "Strict" depending on your architecture
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(401).json({
        messaage: "User Not Found",
      });
    }
    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    });
  } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Server Error"
      })
  }
  
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/"
  });

  return res.status(200).json({
    message: "Logout successful",
  });
};
module.exports = { signup, login, getCurrentUser, logout};
