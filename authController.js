const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const UserModel = require('../models/userModel');
  const SECRET = process.env.JWT_SECRET || 'birthday_super_secret_2025';
  
  exports.signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields required' });
      }
      const existing = await UserModel.findByEmail(email);
      if (existing) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      const hashed = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        id: Date.now().toString(),
        name,
        email,
        password: hashed
      });
      res.status(201).json({ message: 'User created', user: { id: newUser.id, name, email } });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user.id, email: user.email }, SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  };