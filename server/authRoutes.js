// server/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('./authMiddleware');


// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Generate a JWT token
    const token = jwt.sign({ user: { id: newUser.id, email: newUser.email } }, process.env.JWT_SECRET);

    res.json({ token, user: { id: newUser.id, email: newUser.email } });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ user: { id: user.id, email: user.email } }, process.env.JWT_SECRET);

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
