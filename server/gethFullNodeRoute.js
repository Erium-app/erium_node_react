
const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

// Define an API endpoint to generate Ethereum accounts using Clef
router.get('/generate-accounts', (req, res) => {
  const keystorePath = req.query.keystore || 'geth-NewNode/keystore';

  // Replace with the command to generate Ethereum accounts using Clef
  const clefCommand = `clef newaccount --keystore ${keystorePath}`;

  exec(clefCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating Ethereum accounts: ${error.message}`);
      res.status(500).json({ error: 'Failed to generate Ethereum accounts' });
      return;
    }

    // Extract the generated account address and password from Clef's output
    const match = /Generated account (\w+)/.exec(stdout);
    if (match) {
      const accountAddress = match[1];
      console.log(`Generated Ethereum account: ${accountAddress}`);
      res.status(200).json({ message: 'Ethereum accounts generated successfully', accountAddress });
    } else {
      console.error('Failed to extract account address from Clef output');
      res.status(500).json({ error: 'Failed to generate Ethereum accounts' });
    }
  });
});

// Define an API endpoint to start Clef and Geth
router.get('/start-nodes', (req, res) => {
  const keystorePath = req.query.keystore || 'geth-NewNode/keystore';
  const jwtSecretPath = req.query.jwtsecret || 'geth-NewNode/jwtsecret';

  // Replace with the commands to start Clef and Geth
  const clefStartCommand = `clef --keystore ${keystorePath} --configdir geth-tutorial/clef --chainid 11155111`;
  const gethStartCommand = `geth --sepolia --datadir geth-tutorial --authrpc.addr localhost --authrpc.port 8551 --authrpc.vhosts localhost --authrpc.jwtsecret ${jwtSecretPath} --http --http.api eth,net --signer=geth-tutorial/clef/clef.ipc --http`;

  exec(clefStartCommand, (error1) => {
    if (error1) {
      console.error(`Error starting Clef: ${error1.message}`);
      res.status(500).json({ error: 'Failed to start Clef' });
      return;
    }

    exec(gethStartCommand, (error2) => {
      if (error2) {
        console.error(`Error starting Geth: ${error2.message}`);
        res.status(500).json({ error: 'Failed to start Geth' });
        return;
      }

      console.log('Clef and Geth nodes started successfully');
      res.status(200).json({ message: 'Clef and Geth nodes started successfully' });
    });
  });
});

module.exports = router;