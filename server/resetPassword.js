// server/resetPassword.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generate a random temporary password
function generateTemporaryPassword(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let temporaryPassword = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    temporaryPassword += charset[randomIndex];
  }
  return temporaryPassword;
}

// Send a password reset email
async function sendPasswordResetEmail(email, temporaryPassword) {
  const transporter = nodemailer.createTransport({
    // Configure your email service provider here
    service: 'Gmail',
    auth: {
      user: 'your_email@gmail.com', // Your email address
      pass: 'your_password', // Your email password
    },
  });

  const mailOptions = {
    from: 'your_email@gmail.com', // Your email address
    to: email,
    subject: 'Password Reset Request',
    text: `Your temporary password is: ${temporaryPassword}`,
  };

  await transporter.sendMail(mailOptions);
}

// Handle password reset logic
router.post('/request', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Generate a temporary password
    const temporaryPassword = generateTemporaryPassword(12);

    // Hash the temporary password and update it in the database
    const saltRounds = 10;
    const hashedTemporaryPassword = await bcrypt.hash(temporaryPassword, saltRounds);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedTemporaryPassword,
      },
    });

    // Send the temporary password via email
    await sendPasswordResetEmail(email, temporaryPassword);

    res.json({ msg: 'Password reset email sent' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
