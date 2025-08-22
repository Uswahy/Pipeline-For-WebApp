const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
  res.send(`✅ DevOps Demo App is running! Time: ${new Date().toISOString()}`);
});

app.listen(PORT, () => console.log(`Server running on http://0.0.0.0:${PORT}`));
