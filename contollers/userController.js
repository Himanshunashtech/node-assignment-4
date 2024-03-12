
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  
  const { name, email, password } = req.body;

  
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  
  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to register user" });
  }
};

const login = async (req, res) => {
  
  const { email, password } = req.body;

  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid email or password" });
  }


  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).json({ token });
};

module.exports = {
  register,
  login
};
