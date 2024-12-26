const express = require('express');
const app = express();

app.use(express.json());

app.get('/status-200', (req, res) => {
    res.status(200).json({ message: 'Everything is OK!' });
});

app.post('/status-201', (req, res) => {
    res.status(201).json({ message: 'Resource created!' });
});

app.get('/status-404', (req, res) => {
    res.status(404).json({ error: 'Resource not found.' });
});

app.get('/status-400', (req, res) => {
    res.status(400).json({ error: 'Bad request.' });
});

app.listen(3000, () => {
    console.log('Status Codes server running on :3000');
});
