const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'volunteers',
  password: '1234', // <-- replace with your actual password
  port: 5432,
});

app.use(cors());
app.use(express.json());

// --- Organizations ---
app.get('/api/organizations', async (req, res) => {
  const result = await pool.query('SELECT * FROM organization');
  res.json(result.rows);
});

app.post('/api/organizations', async (req, res) => {
  const { name, description, contact_email } = req.body;
  const result = await pool.query(
    'INSERT INTO organization (name, description, contact_email) VALUES ($1, $2, $3) RETURNING *',
    [name, description, contact_email]
  );
  res.status(201).json(result.rows[0]);
});

// --- Users ---
app.post('/api/users', async (req, res) => {
  const { email, password, name, phone, role, organization_id } = req.body;
  const result = await pool.query(
    'INSERT INTO users (email, password, name, phone, role, organization_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [email, password, name, phone, role, organization_id]
  );
  res.status(201).json(result.rows[0]);
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query(
    'SELECT * FROM users WHERE email=$1 AND password=$2',
    [email, password]
  );
  if (result.rows.length > 0) {
    res.json(result.rows[0]);
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// --- Opportunities ---
app.get('/api/opportunities', async (req, res) => {
  const result = await pool.query('SELECT * FROM opportunities');
  res.json(result.rows);
});

app.post('/api/opportunities', async (req, res) => {
  const { title, description, date, location, organization_id, hours } = req.body;
  const result = await pool.query(
    'INSERT INTO opportunities (title, description, date, location, organization_id, hours) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, description, date, location, organization_id, hours]
  );
  res.status(201).json(result.rows[0]);
});

// --- Contributions ---
app.get('/api/contributions', async (req, res) => {
  const { user_id } = req.query;
  const result = await pool.query(
    `SELECT c.id, o.title AS event_name
     FROM contributions c
     JOIN opportunities o ON c.opportunity_id = o.id
     WHERE c.user_id = $1`,
    [user_id]
  );
  res.json(result.rows);
});

app.post('/api/contributions', async (req, res) => {
  const { user_id, opportunity_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contributions (user_id, opportunity_id) VALUES ($1, $2) RETURNING *',
      [user_id, opportunity_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
