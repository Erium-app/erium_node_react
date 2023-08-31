const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { exec } = require('child_process');
const os = require('os');

router.post('/host-password', async (req, res) => {
  try {
    const username = os.hostname();
    const { hostCurrentPassword, hostNewPassword } = req.body;

    const command = `./updatePassword.sh ${username} ${hostCurrentPassword} ${hostNewPassword}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (stdout) {
        console.log(`Script Output: ${stdout}`);
        return res.status(200).json({ message: `Password updated successfully for user ${username}` });
      }
      if (stderr) {
        console.error(`Script Error: ${stderr}`);
        if (stdout.includes('passwd: password updated successfully')) {
          return res.status(200).json({ message: 'Password updated successfully' });
        } else {
          return res.status(400).json({ error: 'Bad Request' });
        }
      }
    });

    return res.status(200).json({ message: 'Processing request' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});

// Define the route
router.post('/ui-password', async (req, res) => {
  try {
    const { email, password: pass, recoveryCode } = req.body;

    let existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      // Update password if email exists
      const hashedPassword = await bcrypt.hash(pass, 10);
      existingUser = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          password: hashedPassword,
          recoveryCode: recoveryCode,
        },
      });
    } else {
      // Create new user if email doesn't exist
      const username = email.substring(0, email.indexOf('@'));
      const hashedPassword = await bcrypt.hash(pass, 10);
      existingUser = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
          recoveryCode: recoveryCode,
        },
      });
    }

    const { password, ...user } = existingUser;

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;
