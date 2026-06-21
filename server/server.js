require("dotenv").config();

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require('express');
const cors = require('cors');
const path = require('path');

const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend (merged deployment: same origin for API + static assets)
app.use(express.static(path.join(__dirname, '..', 'client')));

// NOTE: order matters. Keep API routes above the SPA catch-all.



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

// Root + SPA catch-all: return the frontend for non-API routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// If the frontend uses client-side routing, this keeps deep links working.
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/') || req.path === '/test-db') return next();
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
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



