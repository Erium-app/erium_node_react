const express = require('express');
const wifi = require('node-wifi');

const router = express.Router();

// Connect to WiFi network
function connectToWiFi(ssid, password) {
  return new Promise((resolve, reject) => {
    wifi.connect({ ssid, password }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

router.post('/connect-wifi', async (req, res) => {
  try {
    // Initialize wifi module
    wifi.init({
      iface: null, // Network interface to use (optional)
    });

    const { ssid, password } = req.body;

    await connectToWiFi(ssid, password);

    return res.status(200).json({ message: 'Successfully connected to WiFi.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/change-wifi-pass', async (req, res) => {
    try {
      const { ssid, currentPassword, newPassword } = req.body;
  
      if (!ssid || !currentPassword || !newPassword) {
        return res.status(400).json({ message: "Please provide all required fields." });
      }
  
      // Construct the nmcli command to change the Wi-Fi password
      const command = `nmcli device wifi con '${ssid}' password '${currentPassword}'`;
  
      // Execute the command to change the password
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Failed to change Wi-Fi password:', error);
          return res.status(500).json({ message: "Failed to change Wi-Fi password." });
        }
  
        // Success, now change the saved password for the connection
        const changePasswordCmd = `nmcli connection modify '${ssid}' wifi-sec.psk '${newPassword}'`;
        exec(changePasswordCmd, (changeError, changeStdout, changeStderr) => {
          if (changeError) {
            console.error('Error changing saved WiFi password:', changeError.message);
            return res.status(500).json({ message: "Failed to change saved WiFi password." });
          }
          return res.status(200).json({ message: 'WiFi password changed successfully.' });
        });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
