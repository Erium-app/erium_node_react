const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require('./authRoutes');
const resetPassword = require('./resetPassword');
const systemInfoRouter = require('./systemInfo');
const wifiRoutes = require('./wifiRoutes');
const passwordRoute = require('./passwordRoute')
const authMiddleware = require('./authMiddleware');

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", 
  // origin: "http://127.0.0.1:5173", 
 
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reset', resetPassword);
app.use('/api/system',authMiddleware, systemInfoRouter);
app.use('/api/wifi',authMiddleware, wifiRoutes);
app.use('/api/change-password',authMiddleware, passwordRoute);

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
