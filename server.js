const express = require('express');
const path = require('path');
const cors = require('cors');
const { spawn } = require('child_process');
const authRoutes = require('./routes/authRoutes');
const birthdayRoutes = require('./routes/birthdayRoutes');

const app = express();
const PORT = 5000;
const JSON_PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/birthdays', birthdayRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start JSON Server as a child process
const jsonServer = spawn('npx', ['json-server', '--watch', './data/db.json', '--port', JSON_PORT], {
  stdio: 'inherit',
  shell: true
});

app.listen(PORT, () => {
  console.log(`✅ Birthday Tracker Server: http://localhost:${PORT}`);
  console.log(`📦 JSON Server: http://localhost:${JSON_PORT}`);
});

process.on('SIGINT', () => {
  jsonServer.kill();
  process.exit();
});