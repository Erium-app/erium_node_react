const express = require('express');
const router = express.Router();
const si = require('systeminformation');
const os = require('os');

// Convert size from MB to GB
function convertMBtoGB(sizeInMB) {
  const sizeInGB = sizeInMB / 1024;
  return sizeInGB?.toFixed(2);
}

// Get CPU usage
async function getCpuUsage() {
  try {
    const data = await si.currentLoad();
    return data.currentLoad?.toFixed(2);
  } catch (error) {
    throw error;
  }
}

// Get memory usage
async function getMemoryUsage() {
  try {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    if (totalMemory === undefined || freeMemory === undefined) {
      throw new Error('Failed to retrieve memory information');
    }
    const usedMemory = totalMemory - freeMemory;
    const memoryUsage = ((usedMemory / totalMemory) * 100)?.toFixed(2);
    const usedMemoryGB = convertMBtoGB(usedMemory);
    const freeMemoryGB = convertMBtoGB(freeMemory);
    return {
      usage: memoryUsage,
      used: usedMemoryGB,
      free: freeMemoryGB,
    };
  } catch (error) {
    throw error;
  }
}

// Get disk usage
async function getDiskUsage() {
  try {
    const data = await si.fsSize();
    if (!data || data.length === 0) {
      throw new Error('Failed to retrieve disk information');
    }
    const diskUsage = data[0].use?.toFixed(2);
    const usedDiskGB = convertMBtoGB(data[0].used);
    const freeDiskGB = convertMBtoGB(data[0].size - data[0].used);
    return {
      usage: diskUsage,
      used: usedDiskGB,
      free: freeDiskGB,
    };
  } catch (error) {
    throw error;
  }
}

// Express route
router.get('/system-info', async (req, res) => {
  try {
    const _cpuUsage = await getCpuUsage();
    const memoryInfo = await getMemoryUsage();
    const diskInfo = await getDiskUsage();

    console.log(_cpuUsage)

    const sysInfo = {
      cpuUsage: _cpuUsage,
      memoryUsage: memoryInfo.usage,
      usedMemory: memoryInfo.used,
      freeMemory: memoryInfo.free,
      diskUsage: diskInfo.usage,
      usedDiskSpace: diskInfo.used,
      freeDiskSpace: diskInfo.free,
    };

    res.status(200).json(sysInfo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
const { exec } = require('child_process');

router.post('/reboot', (req, res) => {
  try {
    exec('shutdown -r now', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "An error occurred while rebooting the server." });
      } else {
        console.log('Server reboot initiated.');
        res.status(200).json({ message: "Server reboot initiated." });
      }
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/shutdown', async (req, res) => {
    try {
      exec('shutdown now', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).json({ message: "An error occurred while shutting down the server." });
        }
        console.log('Server reboot initiated.');
        return res.status(200).json({ message: "Server shutdown initiated." });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
