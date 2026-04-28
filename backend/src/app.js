const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'] }));
app.use(express.json());

// Routes
app.use('/api/resources', require('./routes/resources.route'));
app.use('/api/user', require('./routes/user.route'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
