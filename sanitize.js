// Importing xss
const xss = require('xss');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/sanitize-input', (req, res) => {
    const userInput = req.body.input;

    // Sanitizing input
    const sanitizedInput = xss(userInput);

    res.json({
        sanitized: sanitizedInput,
        original: userInput
    });
});

app.listen(3000, () => {
    console.log('Sanitize Input server running on http://localhost:3000');
});
