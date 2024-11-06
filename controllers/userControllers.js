const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

  exports.createUser = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const userExists = await User.findOne({ userName });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createdUser = await User.create({ userName, password: hashedPassword });
    if (!createdUser) {
      return res.status(500).json({ message: 'User could not be created' });
    }
    
    const token = jwt.sign({ userId: createdUser.id }, secretKey, { expiresIn: '5h' });

    res.status(200).json({ message: 'User created successfully', token });
  };

  exports.signInUser = async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: 'Invalid userName or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid userName or password' });
    }
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '5h' });
    res.status(200).json({ message: 'User signed in successfully', token });
  };