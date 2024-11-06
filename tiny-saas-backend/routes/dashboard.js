// routes/dashboard.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
function authorize(req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(403).json({ error: 'Not Authorized' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload.user_id;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Not Authorized' });
  }
}

// Dashboard
router.get('/', authorize, async (req, res) => {
  try {
    const user = await pool.query('SELECT email FROM users WHERE id = $1', [req.user]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

