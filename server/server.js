require("dotenv").config();

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require('express');
const cors = require('cors');

const pool = require('./db');

const app = express();


app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Test DB connectivity
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Simple root response
app.get('/', (req, res) => {
  res.json({ message: 'Backend running' });
});

// Accept user name and return a greeting
app.post('/api/name', (req, res) => {
  const { name } = req.body || {};

  const cleaned = typeof name === 'string' ? name.trim() : '';
  if (!cleaned) {
    return res.status(400).json({ error: 'Name is required' });
  }

  return res.json({ message: `Hello, ${cleaned}!` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});



