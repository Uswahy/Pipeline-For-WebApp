const express = require('express');
const fs = require('fs');
const app = express();
const port = 80;

// Log each visit
app.get('/', (req, res) => {
    const log = `${new Date().toISOString()} - ${req.ip} visited\n`;
    fs.appendFile('/var/log/webapp/access.log', log, (err) => {
        if (err) console.error(err);
    });
    res.send('✅ App deployed successfully via DevOps pipeline!');
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

