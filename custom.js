const express = require('express');
const app = express();

app.use(express.json());

// Middleware to add custom header
app.use((req, res, next) => {
    res.setHeader('X-Server-Timestamp', new Date().toISOString());
    next();
});

app.get('/custom-header', (req, res) => {
    res.json({ message: 'Custom header added!' });
});

app.listen(3000, () => {
    console.log('Custom Headers server running on:3000');
});
